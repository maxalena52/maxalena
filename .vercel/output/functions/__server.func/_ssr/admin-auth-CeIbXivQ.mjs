import { n as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-CeIbXivQ.js
/** SHA-256 of the authorised account. Never put the address in UI or client JS. */
var AUTHOR_EMAIL_SHA256 = "a324c53cab00a3794671e27ecc5794ef70b798231dc13d4cf93d09199c961542";
var DESK_COOKIE = "maxalena_desk";
var STATE_COOKIE = "maxalena_desk_state";
var MAX_AGE_SEC = 1209600;
function sha256Hex(value) {
	return import("node:crypto").then(({ createHash }) => createHash("sha256").update(value).digest("hex"));
}
function hmacHex(secret, value) {
	return import("node:crypto").then(({ createHmac }) => createHmac("sha256", secret).update(value).digest("hex"));
}
function deskSecret() {
	return (process.env.DESK_SESSION_SECRET || "").trim();
}
function googleCreds() {
	return {
		clientId: (process.env.GOOGLE_CLIENT_ID || "").trim(),
		clientSecret: (process.env.GOOGLE_CLIENT_SECRET || "").trim()
	};
}
async function isAuthorEmail(email) {
	return await sha256Hex(email.trim().toLowerCase()) === AUTHOR_EMAIL_SHA256;
}
async function signPayload(emailHash, exp) {
	const secret = deskSecret();
	if (!secret) throw new Error("Desk session is not configured.");
	const body = `${emailHash}.${exp}`;
	return `${body}.${await hmacHex(secret, body)}`;
}
async function readDeskCookie() {
	const { getCookie } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
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
async function writeDeskCookie() {
	const { setCookie } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
	setCookie(DESK_COOKIE, await signPayload(AUTHOR_EMAIL_SHA256, Date.now() + MAX_AGE_SEC * 1e3), {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		maxAge: MAX_AGE_SEC
	});
}
async function clearAuthCookies() {
	const { setCookie } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
	setCookie(DESK_COOKIE, "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		maxAge: 0
	});
	setCookie(STATE_COOKIE, "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		maxAge: 0
	});
}
async function requestOrigin() {
	try {
		const { getRequest } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
		const req = getRequest();
		if (req?.url) {
			const url = new URL(req.url);
			if (url.hostname.endsWith("maxalena.com")) return url.origin;
		}
	} catch {}
	return "https://www.maxalena.com";
}
async function requireAuthor(_accessToken) {
	if (!await readDeskCookie()) throw new Error("Unauthorized");
	return { ok: true };
}
var verifyAuthorSession_createServerFn_handler = createServerRpc({
	id: "4fe0013fec0a294969df4d2a162467d5535e7a51cf4e61734306d925b14c49f5",
	name: "verifyAuthorSession",
	filename: "src/lib/admin-auth.ts"
}, (opts) => verifyAuthorSession.__executeServer(opts));
var verifyAuthorSession = createServerFn({ method: "POST" }).handler(verifyAuthorSession_createServerFn_handler, async () => {
	await requireAuthor();
	return { ok: true };
});
var signOutDesk_createServerFn_handler = createServerRpc({
	id: "388bc2e817d189359a2c7def1a0122d76e904ddbbd8bc1e23b044095aa5e6c18",
	name: "signOutDesk",
	filename: "src/lib/admin-auth.ts"
}, (opts) => signOutDesk.__executeServer(opts));
var signOutDesk = createServerFn({ method: "POST" }).handler(signOutDesk_createServerFn_handler, async () => {
	await clearAuthCookies();
	return { ok: true };
});
var startGoogleLogin_createServerFn_handler = createServerRpc({
	id: "0bd0c6478faa37de4c26bff83343a39c5d9aa9fa49fb5a4a802f94361cf8bfb0",
	name: "startGoogleLogin",
	filename: "src/lib/admin-auth.ts"
}, (opts) => startGoogleLogin.__executeServer(opts));
var startGoogleLogin = createServerFn({ method: "POST" }).handler(startGoogleLogin_createServerFn_handler, async () => {
	const { clientId } = googleCreds();
	if (!clientId || !deskSecret()) throw new Error("Google sign-in is not configured on Vercel yet.");
	const { randomBytes } = await import("node:crypto");
	const { setCookie } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
	const state = randomBytes(16).toString("hex");
	setCookie(STATE_COOKIE, state, {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		maxAge: 600
	});
	const origin = await requestOrigin();
	const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
	url.searchParams.set("client_id", clientId);
	url.searchParams.set("redirect_uri", `${origin}/admin/callback`);
	url.searchParams.set("response_type", "code");
	url.searchParams.set("scope", "openid email");
	url.searchParams.set("prompt", "select_account");
	url.searchParams.set("state", state);
	return { url: url.toString() };
});
var finishGoogleLogin_createServerFn_handler = createServerRpc({
	id: "989ae3db141d4a3e6bc89ec734d7f1fdbadf07996c774c799162525bf5024d8c",
	name: "finishGoogleLogin",
	filename: "src/lib/admin-auth.ts"
}, (opts) => finishGoogleLogin.__executeServer(opts));
var finishGoogleLogin = createServerFn({ method: "POST" }).validator((input) => object({
	code: string().min(1),
	state: string().min(1)
}).parse(input)).handler(finishGoogleLogin_createServerFn_handler, async ({ data }) => {
	const { clientId, clientSecret } = googleCreds();
	if (!clientId || !clientSecret || !deskSecret()) throw new Error("Google sign-in is not configured on Vercel yet.");
	const { getCookie } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
	const expectedState = getCookie(STATE_COOKIE);
	if (!expectedState || expectedState !== data.state) throw new Error("Sign-in expired. Try again.");
	const origin = await requestOrigin();
	const body = new URLSearchParams({
		code: data.code,
		client_id: clientId,
		client_secret: clientSecret,
		redirect_uri: `${origin}/admin/callback`,
		grant_type: "authorization_code"
	});
	const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		body
	});
	const tokenJson = await tokenRes.json();
	if (!tokenRes.ok || !tokenJson.id_token) throw new Error("Google sign-in failed.");
	const payloadPart = tokenJson.id_token.split(".")[1];
	const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8"));
	if (!payload.email || payload.email_verified === false || !await isAuthorEmail(payload.email)) {
		await clearAuthCookies();
		throw new Error("This desk is private.");
	}
	await writeDeskCookie();
	return { ok: true };
});
//#endregion
export { finishGoogleLogin_createServerFn_handler, signOutDesk_createServerFn_handler, startGoogleLogin_createServerFn_handler, verifyAuthorSession_createServerFn_handler };
