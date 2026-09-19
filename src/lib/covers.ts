import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuthor } from "./admin-auth";

const OWNER = "maxalena52";
const REPO = "maxalena";
const BRANCH = "main";
const ALLOWED = new Set(["jpg", "jpeg", "png", "webp"]);

const BY_SLUG: Record<string, string> = {
  "blood-covenant": "/covers/blood-covenant.jpg",
  "ceo-s-hostile-take-over": "/covers/ceo-s-hostile-take-over.jpg",
  "office-hours": "/covers/office-hours.png",
  "grim-reaper-chaos": "/covers/grim-reaper-chaos.png",
  "the-dragon-commanders-captive": "/covers/the-dragon-commanders-captive.jpg",
};

export function coverSrc(book: { slug?: string | null; cover_url?: string | null }) {
  const stored = (book.cover_url || "").trim();
  if (stored.startsWith("/covers/")) return stored;
  if (book.slug && BY_SLUG[book.slug]) return BY_SLUG[book.slug];
  if (/^https?:\/\//i.test(stored)) return stored;
  if (stored) return `/covers/${stored.replace(/^\/+/, "")}`;
  return null;
}

function githubToken() {
  return (process.env.GITHUB_COVERS_TOKEN || process.env.GITHUB_TOKEN || "").trim();
}

export const uploadBookCover = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        slug: z.string().min(1).max(120),
        filename: z.string().min(1).max(180),
        dataBase64: z.string().min(20).max(12_000_000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    await requireAuthor();
    const token = githubToken();
    if (!token) {
      throw new Error("Add GITHUB_COVERS_TOKEN in Vercel to upload covers to GitHub.");
    }
    const ext = (data.filename.split(".").pop() || "").toLowerCase();
    if (!ALLOWED.has(ext)) throw new Error("Use a JPG, PNG, or WebP cover.");
    const safeSlug = data.slug.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
    const path = `public/covers/${safeSlug}.${ext === "jpeg" ? "jpg" : ext}`;
    const content = data.dataBase64.replace(/^data:[^;]+;base64,/, "");
    const headers = {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "x-github-api-version": "2022-11-28",
      "user-agent": "maxalena-desk",
    };
    const getUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
    let sha: string | undefined;
    const existing = await fetch(getUrl, { headers });
    if (existing.ok) {
      const json = (await existing.json()) as { sha?: string };
      sha = json.sha;
    }
    const put = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
      method: "PUT",
      headers: { ...headers, "content-type": "application/json" },
      body: JSON.stringify({
        message: `Add cover for ${safeSlug}`,
        content,
        branch: BRANCH,
        sha,
      }),
    });
    if (!put.ok) {
      throw new Error("GitHub did not accept the cover. Check the token can write to the repo.");
    }
    return { ok: true as const, coverUrl: `/${path.replace(/^public\//, "")}` };
  });
