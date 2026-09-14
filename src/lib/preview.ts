import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuthor } from "./admin-auth";
import { getSupabase } from "./supabase";
import { isValidHttpUrl } from "./urls";

export type PreviewChapter = {
  index: 1 | 2;
  title: string;
  paragraphs: string[];
};

export type BookPreview = {
  found: boolean;
  slug: string;
  title: string;
  coverUrl: string | null;
  amazonUrl: string | null;
  patreonUrl: string | null;
  readingUrl: string | null;
  status: string | null;
  chapters: PreviewChapter[];
};

const MAX_CHAPTERS = 2;
const MAX_BODY = 80_000;

function paragraphsOf(body: string) {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

function takeTwoFromManuscript(raw: string): PreviewChapter[] {
  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text || /^https?:\/\//i.test(text)) return [];
  const parts = text.split(/\n(?=\s*(?:chapter\s+(?:\d+|[ivxlcdm]+|one|two|three|four|five|six|seven|eight|nine|ten)|prologue|epilogue)\b)/i);
  const source = (parts.length ? parts : [text]).map((c: string) => c.trim()).filter(Boolean);
  const out: PreviewChapter[] = [];
  for (let i = 0; i < Math.min(MAX_CHAPTERS, source.length); i++) {
    const chunk = source[i].slice(0, MAX_BODY);
    const firstLine = chunk.split("\n")[0]?.trim() ?? "";
    const looksLikeHeading = /^(chapter|prologue|epilogue)\b/i.test(firstLine);
    const title = looksLikeHeading ? firstLine : i === 0 ? "Chapter One" : "Chapter Two";
    const body = looksLikeHeading ? chunk.slice(firstLine.length).trim() : chunk;
    const paragraphs = paragraphsOf(body);
    if (!paragraphs.length) continue;
    out.push({ index: (out.length + 1) as 1 | 2, title, paragraphs });
  }
  return out;
}

function chaptersFromFields(oneTitle: string, oneBody: string, twoTitle: string, twoBody: string): PreviewChapter[] {
  const out: PreviewChapter[] = [];
  const one = paragraphsOf(oneBody.slice(0, MAX_BODY));
  const two = paragraphsOf(twoBody.slice(0, MAX_BODY));
  if (one.length) out.push({ index: 1, title: oneTitle.trim() || "Chapter One", paragraphs: one });
  if (two.length) out.push({ index: (out.length + 1) as 1 | 2, title: twoTitle.trim() || "Chapter Two", paragraphs: two });
  return out.slice(0, MAX_CHAPTERS);
}

function pickLink(links: { platform?: string; url?: string }[] | null, test: RegExp) {
  const match = (links || []).find((l) => isValidHttpUrl(l.url) && test.test(`${l.platform || ""} ${l.url}`));
  return match?.url || null;
}

export const getBookPreview = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }): Promise<BookPreview> => {
    const empty: BookPreview = {
      found: false,
      slug: data.slug,
      title: "",
      coverUrl: null,
      amazonUrl: null,
      patreonUrl: null,
      readingUrl: null,
      status: null,
      chapters: [],
    };
    const { data: book } = await getSupabase()
      .from("books")
      .select("title,slug,cover_url,status,category,purchase_links,sample_chapter")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!book) return empty;

    const { data: settingsRows } = await getSupabase().from("site_settings").select("key,value");
    const settings: Record<string, string> = {};
    for (const row of (settingsRows || []) as { key: string; value: string }[]) settings[row.key] = row.value;

    const links = (book.purchase_links || []) as { platform?: string; url?: string }[];
    const amazonUrl = pickLink(links, /amazon|kdp/i);
    const patreonUrl =
      pickLink(links, /patreon/i) || (isValidHttpUrl(settings.patreon_url) ? settings.patreon_url : null);
    const readingSetting = settings[`reading_url_${book.slug}`];
    const sample = typeof book.sample_chapter === "string" ? book.sample_chapter : "";
    const readingUrl = isValidHttpUrl(readingSetting)
      ? readingSetting
      : isValidHttpUrl(sample)
        ? sample
        : pickLink(links, /read|wattpad|kindle|serial/i);

    let chapters: PreviewChapter[] = [];
    try {
      const { getSql } = await import("@/lib/db");
      const sql = await getSql();
      const rows = await sql<{
        chapter_one_title: string;
        chapter_one_body: string;
        chapter_two_title: string;
        chapter_two_body: string;
      }>`
        select chapter_one_title, chapter_one_body, chapter_two_title, chapter_two_body
        from book_previews
        where slug = ${data.slug}
        limit 1
      `;
      if (rows[0]) {
        chapters = chaptersFromFields(
          rows[0].chapter_one_title,
          rows[0].chapter_one_body,
          rows[0].chapter_two_title,
          rows[0].chapter_two_body,
        );
      }
    } catch {
      chapters = [];
    }

    if (!chapters.length) chapters = takeTwoFromManuscript(sample);

    return {
      found: true,
      slug: book.slug,
      title: book.title,
      coverUrl: book.cover_url,
      amazonUrl,
      patreonUrl,
      readingUrl,
      status: book.status,
      chapters,
    };
  });

export const saveBookPreview = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        accessToken: z.string().min(20),
        slug: z.string().min(1).max(120),
        chapterOneTitle: z.string().max(200),
        chapterOneBody: z.string().max(MAX_BODY),
        chapterTwoTitle: z.string().max(200),
        chapterTwoBody: z.string().max(MAX_BODY),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    await requireAuthor(data.accessToken);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      insert into book_previews (slug, chapter_one_title, chapter_one_body, chapter_two_title, chapter_two_body, updated_at)
      values (
        ${data.slug},
        ${data.chapterOneTitle || "Chapter One"},
        ${data.chapterOneBody},
        ${data.chapterTwoTitle || "Chapter Two"},
        ${data.chapterTwoBody},
        now()
      )
      on conflict (slug) do update set
        chapter_one_title = excluded.chapter_one_title,
        chapter_one_body = excluded.chapter_one_body,
        chapter_two_title = excluded.chapter_two_title,
        chapter_two_body = excluded.chapter_two_body,
        updated_at = now()
    `;
    return { ok: true as const };
  });

export const getBookPreviewForAdmin = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ accessToken: z.string().min(20), slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    await requireAuthor(data.accessToken);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{
      chapter_one_title: string;
      chapter_one_body: string;
      chapter_two_title: string;
      chapter_two_body: string;
    }>`
      select chapter_one_title, chapter_one_body, chapter_two_title, chapter_two_body
      from book_previews where slug = ${data.slug} limit 1
    `;
    return (
      rows[0] || {
        chapter_one_title: "Chapter One",
        chapter_one_body: "",
        chapter_two_title: "Chapter Two",
        chapter_two_body: "",
      }
    );
  });
