import { t as getSupabase } from "./supabase-BbIcayfE.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { n as requireAuthor } from "./admin-auth-Bcy-RAnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DBc3SHsF.js
var submitSchema = object({
	name: string().trim().min(1).max(120),
	email: string().trim().email().max(200),
	subject: string().trim().max(200).default(""),
	message: string().trim().min(10).max(5e3),
	website: string().max(200).optional()
});
var tokenSchema = object({ accessToken: string().min(1) });
var submitContact_createServerFn_handler = createServerRpc({
	id: "6b32fc90e41e8cdeb5a3034277092aae86a0ead42932a2492d012936580e9fd8",
	name: "submitContact",
	filename: "src/lib/contact.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).validator((input) => submitSchema.parse(input)).handler(submitContact_createServerFn_handler, async ({ data }) => {
	if (data.website) return { ok: true };
	try {
		await getSupabase().from("contact_messages").insert({
			name: data.name,
			email: data.email,
			subject: data.subject,
			message: data.message
		});
	} catch {}
	try {
		const { getSql } = await import("./db-BWQtg0ek.mjs");
		await (await getSql())`
        insert into contact_inquiries (name, email, subject, message)
        values (${data.name}, ${data.email}, ${data.subject}, ${data.message})
      `;
	} catch {}
	return { ok: true };
});
var listContactInbox_createServerFn_handler = createServerRpc({
	id: "9ac0ba5cb4789e20ebe96a0213d2b03c258cf8e258bc124a7dcb39c0c766eb11",
	name: "listContactInbox",
	filename: "src/lib/contact.ts"
}, (opts) => listContactInbox.__executeServer(opts));
var listContactInbox = createServerFn({ method: "POST" }).validator((input) => tokenSchema.parse(input)).handler(listContactInbox_createServerFn_handler, async ({ data }) => {
	await requireAuthor(data.accessToken);
	const { getSql } = await import("./db-BWQtg0ek.mjs");
	return (await getSql())`
      select id, name, email, subject, message, created_at
      from contact_inquiries
      order by created_at desc
      limit 200
    `;
});
//#endregion
export { listContactInbox_createServerFn_handler, submitContact_createServerFn_handler };
