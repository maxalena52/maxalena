import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./supabase-Cr5qzaz-.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-D618edk9.js
/** SHA-256 of the authorised account. Never put the address in UI or client JS. */
var AUTHOR_EMAIL_SHA256 = "a324c53cab00a3794671e27ecc5794ef70b798231dc13d4cf93d09199c961542";
var DESK_COOKIE = "maxalena_desk";
function hmacHex(secret, value) {
	return import("node:crypto").then(({ createHmac }) => createHmac("sha256", secret).update(value).digest("hex"));
}
function deskSecret() {
	return (process.env.DESK_SESSION_SECRET || "").trim();
}
async function readDeskCookie() {
	const { getCookie } = await import("./ssr.mjs").then((n) => n.o).then((n) => n.t);
	const raw = getCookie(DESK_COOKIE);
	if (!raw) return null;
	const secret = deskSecret();
	if (!secret) return null;
	const parts = raw.split(".");
	if (parts.length !== 3) return null;
	const [emailHash, expRaw, sig] = parts;
	const exp = Number(expRaw);
	if (!emailHash || !sig || !Number.isFinite(exp) || exp < Date.now()) return null;
	if (await hmacHex(secret, `${emailHash}.${exp}`) !== sig) return null;
	if (emailHash !== AUTHOR_EMAIL_SHA256) return null;
	return {
		emailHash,
		exp
	};
}
async function requireAuthor(_accessToken) {
	if (!await readDeskCookie()) throw new Error("Unauthorized");
	return { ok: true };
}
var verifyAuthorSession = createServerFn({ method: "POST" }).handler(createSsrRpc("4fe0013fec0a294969df4d2a162467d5535e7a51cf4e61734306d925b14c49f5"));
var signOutDesk = createServerFn({ method: "POST" }).handler(createSsrRpc("388bc2e817d189359a2c7def1a0122d76e904ddbbd8bc1e23b044095aa5e6c18"));
var startGoogleLogin = createServerFn({ method: "POST" }).handler(createSsrRpc("0bd0c6478faa37de4c26bff83343a39c5d9aa9fa49fb5a4a802f94361cf8bfb0"));
var finishGoogleLogin = createServerFn({ method: "POST" }).validator((input) => object({
	code: string().min(1),
	state: string().min(1)
}).parse(input)).handler(createSsrRpc("989ae3db141d4a3e6bc89ec734d7f1fdbadf07996c774c799162525bf5024d8c"));
//#endregion
export { verifyAuthorSession as a, startGoogleLogin as i, requireAuthor as n, signOutDesk as r, finishGoogleLogin as t };
