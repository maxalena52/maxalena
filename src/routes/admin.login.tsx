import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useEffect, useState } from "react";
import { AUTHOR_EMAIL, isAuthorEmail, verifyAuthorSession } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Author sign in | Maxalena L." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sb = getSupabase();
    const { data: sub } = sb.auth.onAuthStateChange(async (event, session) => {
      if (!session) return;
      if (event !== "INITIAL_SESSION" && event !== "SIGNED_IN") return;
      try {
        await verifyAuthorSession({ data: { accessToken: session.access_token } });
        await navigate({ to: "/admin" });
      } catch {
        await sb.auth.signOut();
        setError("This desk is restricted to magdalenashade@gmail.com.");
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function enterWithPassword(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    const sb = getSupabase();
    try {
      const { data, error: err } = await sb.auth.signInWithPassword({
        email: AUTHOR_EMAIL,
        password,
      });
      if (err || !data.session) {
        setError("Sign-in failed. Use the email link if you do not have a password yet.");
        return;
      }
      if (!isAuthorEmail(data.session.user.email)) {
        await sb.auth.signOut();
        setError("This desk is restricted to magdalenashade@gmail.com.");
        return;
      }
      await verifyAuthorSession({ data: { accessToken: data.session.access_token } });
      await navigate({ to: "/admin" });
    } catch {
      setError("Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function emailSignInLink() {
    setBusy(true);
    setError("");
    setNotice("");
    const sb = getSupabase();
    const { error: err } = await sb.auth.signInWithOtp({
      email: AUTHOR_EMAIL,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/admin/login`,
      },
    });
    setBusy(false);
    if (err) {
      setError("Could not send the sign-in email. Try again in a moment.");
      return;
    }
    setNotice(`A sign-in link is on its way to ${AUTHOR_EMAIL}. Open it on this device to enter the desk.`);
  }

  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="ornament mb-4">Private desk</p>
      <h1 className="font-display text-4xl">Author sign in</h1>
      <p className="mt-3 text-sm leading-6 text-taupe">
        This desk belongs to one account only: {AUTHOR_EMAIL}. Any other address is refused.
      </p>
      <form onSubmit={(e) => void enterWithPassword(e)} className="mt-8 space-y-4">
        <label className="font-ui block text-xs uppercase tracking-widest text-taupe">
          Email
          <input
            type="email"
            readOnly
            autoComplete="username"
            value={AUTHOR_EMAIL}
            className="mt-1 w-full border border-gold/30 bg-charcoal px-3 py-2 text-sm text-ivory"
          />
        </label>
        <label className="font-ui block text-xs uppercase tracking-widest text-taupe">
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-gold/30 bg-charcoal px-3 py-2 text-sm text-ivory"
          />
        </label>
        {error && <p className="text-sm text-parchment">{error}</p>}
        {notice && <p className="text-sm text-gold">{notice}</p>}
        <button className="btn w-full" disabled={busy || !password} type="submit">
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <button className="btn btn-ghost w-full" disabled={busy} type="button" onClick={() => void emailSignInLink()}>
          Email me a sign-in link
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-taupe">
        <Link to="/">Back to the site</Link>
      </p>
    </main>
  );
}
