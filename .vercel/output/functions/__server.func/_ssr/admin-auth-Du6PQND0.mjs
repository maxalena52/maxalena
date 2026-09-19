import { t as getSupabase } from "./supabase-CFMh116S.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-Du6PQND0.js
var AUTHOR_EMAIL = "magdalenashade@gmail.com";
function isAuthorEmail(email) {
	return (email || "").trim().toLowerCase() === AUTHOR_EMAIL;
}
async function requireAuthor(accessToken) {
	const { data, error } = await getSupabase().auth.getUser(accessToken);
	if (error || !data.user || !isAuthorEmail(data.user.email)) throw new Error("Unauthorized");
	return data.user;
}
var verifyAuthorSession = createServerFn({ method: "POST" }).validator((input) => object({ accessToken: string().min(20) }).parse(input)).handler(createSsrRpc("4fe0013fec0a294969df4d2a162467d5535e7a51cf4e61734306d925b14c49f5"));
//#endregion
export { verifyAuthorSession as n, requireAuthor as t };
