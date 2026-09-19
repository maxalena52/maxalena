import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D75-wYbG.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-8EhAGb7u.js
var submitSchema = object({
	name: string().trim().min(1).max(120),
	email: string().trim().email().max(200),
	subject: string().trim().max(200).default(""),
	message: string().trim().min(10).max(5e3),
	website: string().max(200).optional()
});
var tokenSchema = object({ accessToken: string().min(1) });
var submitContact = createServerFn({ method: "POST" }).validator((input) => submitSchema.parse(input)).handler(createSsrRpc("6b32fc90e41e8cdeb5a3034277092aae86a0ead42932a2492d012936580e9fd8"));
var listContactInbox = createServerFn({ method: "POST" }).validator((input) => tokenSchema.parse(input)).handler(createSsrRpc("9ac0ba5cb4789e20ebe96a0213d2b03c258cf8e258bc124a7dcb39c0c766eb11"));
//#endregion
export { submitContact as n, listContactInbox as t };
