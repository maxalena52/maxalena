import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** SHA-256 of the authorised account. Never put the address in UI or client JS. */
const AUTHOR_EMAIL_SHA256 =
  "a324c53cab00a3794671e27ecc5794ef70b798231dc13d4cf93d09199c961542";

const DESK_COOKIE = "maxalena_desk";
const STATE_COOKIE = "maxalena_desk_state";
const MAX_AGE_SEC = 60 * 60 * 24 * 14;

function sha256Hex(value: string) {
  return import("node:crypto").then(({ createHash }) =>
    createHash("sha256").update(value).digest("hex"),
  );
}

function hmacHex(secret: string, value: string) {
  return import("node:crypto").then(({ createHmac }) =>
    createHmac("sha256", secret).update(value).digest("hex"),
  );
}

function deskSecret() {
  return (process.env.DESK_SESSION_SECRET || "").trim();
}

function googleCreds() {
  return {
    clientId: (process.env.GOOGLE_CLIENT_ID || "").trim(),
    clientSecret: (process.env.GOOGLE_CLIENT_SECRET || "").trim(),
  };
}

async function isAuthorEmail(email: string) {
  const digest = await sha256Hex(email.trim().toLowerCase());
  return digest === AUTHOR_EMAIL_SHA256;
}

async function signPayload(emailHash: string, exp: number) {
  const secret = deskSecret();
  if (!secret) throw new Error("Desk session is not configured.");
  const body = `${emailHash}.${exp}`;
  const sig = await hmacHex(secret, body);
  return `${body}.${sig}`;
}

async function readDeskCookie() {
  const { getCookie } = await import("@tanstack/react-start/server");
  const raw = getCookie(DESK_COOKIE);
  if (!raw) return null;
  const secret = deskSecret();
  if (!secret) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [emailHash, expRaw, sig] = parts;
  const exp = Number(expRaw);
  if (!emailHash || !sig || !Number.isFinite(exp) || exp < Date.now()) return null;
  const expected = await hmacHex(secret, `${emailHash}.${exp}`);
  if (expected !== sig) return null;
  if (emailHash !== AUTHOR_EMAIL_SHA256) return null;
  return { emailHash, exp };
}

async function writeDeskCookie() {
  const { setCookie } = await import("@tanstack/react-start/server");
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const value = await signPayload(AUTHOR_EMAIL_SHA256, exp);
  setCookie(DESK_COOKIE, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

async function clearAuthCookies() {
  const { setCookie } = await import("@tanstack/react-start/server");
  setCookie(DESK_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  setCookie(STATE_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
}

async function requestOrigin() {
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const req = getRequest();
    if (req?.url) {
      const url = new URL(req.url);
      if (url.hostname.endsWith("maxalena.com")) return url.origin;
    }
  } catch {
    /* fall through */
  }
  return "https://www.maxalena.com";
}

export async function requireAuthor(_accessToken?: string) {
  const session = await readDeskCookie();
  if (!session) throw new Error("Unauthorized");
  return { ok: true as const };
}

export const verifyAuthorSession = createServerFn({ method: "POST" }).handler(async () => {
  await requireAuthor();
  return { ok: true as const };
});

export const signOutDesk = createServerFn({ method: "POST" }).handler(async () => {
  await clearAuthCookies();
  return { ok: true as const };
});

export const startGoogleLogin = createServerFn({ method: "POST" }).handler(async () => {
  const { clientId } = googleCreds();
  if (!clientId || !deskSecret()) {
    throw new Error("Google sign-in is not configured on Vercel yet.");
  }
  const { randomBytes } = await import("node:crypto");
  const { setCookie } = await import("@tanstack/react-start/server");
  const state = randomBytes(16).toString("hex");
  setCookie(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
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

export const finishGoogleLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ code: z.string().min(1), state: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { clientId, clientSecret } = googleCreds();
    if (!clientId || !clientSecret || !deskSecret()) {
      throw new Error("Google sign-in is not configured on Vercel yet.");
    }
    const { getCookie } = await import("@tanstack/react-start/server");
    const expectedState = getCookie(STATE_COOKIE);
    if (!expectedState || expectedState !== data.state) {
      throw new Error("Sign-in expired. Try again.");
    }
    const origin = await requestOrigin();
    const body = new URLSearchParams({
      code: data.code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${origin}/admin/callback`,
      grant_type: "authorization_code",
    });
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    const tokenJson = (await tokenRes.json()) as { id_token?: string; error?: string };
    if (!tokenRes.ok || !tokenJson.id_token) {
      throw new Error("Google sign-in failed.");
    }
    const payloadPart = tokenJson.id_token.split(".")[1];
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8")) as {
      email?: string;
      email_verified?: boolean;
    };
    if (!payload.email || payload.email_verified === false || !(await isAuthorEmail(payload.email))) {
      await clearAuthCookies();
      throw new Error("This desk is private.");
    }
    await writeDeskCookie();
    return { ok: true as const };
  });
