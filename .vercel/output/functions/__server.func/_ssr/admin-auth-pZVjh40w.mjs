import { t as getSupabase } from "./supabase-BbIcayfE.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-pZVjh40w.js
/** SHA-256 of the authorised account. Never put the address in UI or client JS. */
var AUTHOR_EMAIL_SHA256 = "a324c53cab00a3794671e27ecc5794ef70b798231dc13d4cf93d09199c961542";
async function requireAuthor(accessToken) {
	const { data, error } = await getSupabase().auth.getUser(accessToken);
	if (error || !data.user?.email) throw new Error("Unauthorized");
	const { createHash } = await import("node:crypto");
	if (createHash("sha256").update(data.user.email.trim().toLowerCase()).digest("hex") !== AUTHOR_EMAIL_SHA256) throw new Error("Unauthorized");
	return data.user;
}
var verifyAuthorSession = createServerFn({ method: "POST" }).validator((input) => object({ accessToken: string().min(20) }).parse(input)).handler(createSsrRpc("4fe0013fec0a294969df4d2a162467d5535e7a51cf4e61734306d925b14c49f5"));
//#endregion
export { verifyAuthorSession as n, requireAuthor as t };
