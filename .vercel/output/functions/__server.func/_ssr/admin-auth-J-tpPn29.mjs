import { t as getSupabase } from "./supabase-CFMh116S.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-J-tpPn29.js
var AUTHOR_EMAIL = "magdalenashade@gmail.com";
function isAuthorEmail(email) {
	return (email || "").trim().toLowerCase() === AUTHOR_EMAIL;
}
async function requireAuthor(accessToken) {
	const { data, error } = await getSupabase().auth.getUser(accessToken);
	if (error || !data.user || !isAuthorEmail(data.user.email)) throw new Error("Unauthorized");
	return data.user;
}
var verifyAuthorSession_createServerFn_handler = createServerRpc({
	id: "4fe0013fec0a294969df4d2a162467d5535e7a51cf4e61734306d925b14c49f5",
	name: "verifyAuthorSession",
	filename: "src/lib/admin-auth.ts"
}, (opts) => verifyAuthorSession.__executeServer(opts));
var verifyAuthorSession = createServerFn({ method: "POST" }).validator((input) => object({ accessToken: string().min(20) }).parse(input)).handler(verifyAuthorSession_createServerFn_handler, async ({ data }) => {
	return {
		ok: true,
		email: (await requireAuthor(data.accessToken)).email || AUTHOR_EMAIL
	};
});
//#endregion
export { verifyAuthorSession_createServerFn_handler };
