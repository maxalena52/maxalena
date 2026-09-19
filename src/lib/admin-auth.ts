import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabase } from "./supabase";

export const AUTHOR_EMAIL = "magdalenashade@gmail.com";

export function isAuthorEmail(email?: string | null) {
  return (email || "").trim().toLowerCase() === AUTHOR_EMAIL;
}

export async function requireAuthor(accessToken: string) {
  const { data, error } = await getSupabase().auth.getUser(accessToken);
  if (error || !data.user || !isAuthorEmail(data.user.email)) {
    throw new Error("Unauthorized");
  }
  return data.user;
}

export const verifyAuthorSession = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ accessToken: z.string().min(20) }).parse(input))
  .handler(async ({ data }) => {
    const user = await requireAuthor(data.accessToken);
    return { ok: true as const, email: user.email || AUTHOR_EMAIL };
  });
