import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuthor } from "./admin-auth";
import { getSupabase } from "./supabase";

const submitSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(200).default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional(),
});

const tokenSchema = z.object({
  accessToken: z.string().min(1),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    try {
      await getSupabase().from("contact_messages").insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
    } catch {
      /* CMS insert may be blocked by RLS. */
    }
    try {
      const { getSql } = await import("@/lib/db");
      const sql = await getSql();
      await sql`
        insert into contact_inquiries (name, email, subject, message)
        values (${data.name}, ${data.email}, ${data.subject}, ${data.message})
      `;
    } catch {
      /* Neon inbox is optional on Vercel until DATABASE_URL is set. */
    }
    return { ok: true as const };
  });

export const listContactInbox = createServerFn({ method: "POST" })
  .validator((input: unknown) => tokenSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAuthor(data.accessToken);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    return sql<{
      id: number;
      name: string;
      email: string;
      subject: string;
      message: string;
      created_at: string;
    }>`
      select id, name, email, subject, message, created_at
      from contact_inquiries
      order by created_at desc
      limit 200
    `;
  });
