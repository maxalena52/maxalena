import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabase } from "./supabase";

/** SHA-256 of the authorised account. Never put the address in UI or client JS. */
const AUTHOR_EMAIL_SHA256 =
  "a324c53cab00a3794671e27ecc5794ef70b798231dc13d4cf93d09199c961542";

export async function requireAuthor(accessToken: string) {
  const { data, error } = await getSupabase().auth.getUser(accessToken);
  if (error || !data.user?.email) {
    throw new Error("Unauthorized");
  }
  const { createHash } = await import("node:crypto");
  const digest = createHash("sha256").update(data.user.email.trim().toLowerCase()).digest("hex");
  if (digest !== AUTHOR_EMAIL_SHA256) {
    throw new Error("Unauthorized");
  }
  return data.user;
}

export const verifyAuthorSession = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ accessToken: z.string().min(20) }).parse(input))
  .handler(async ({ data }) => {
    await requireAuthor(data.accessToken);
    return { ok: true as const };
  });
