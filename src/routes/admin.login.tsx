import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { verifyAuthorSession } from "@/lib/admin-auth";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const sb = getSupabase();
    try {
      const { data, error: err } = await sb.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err || !data.session) {
        setError("Sign-in failed.");
        return;
      }
      try {
        await verifyAuthorSession({ data: { accessToken: data.session.access_token } });
      } catch {
        await sb.auth.signOut();
        setError("This desk is restricted to the authorised author account.");
        return;
      }
      await navigate({ to: "/admin" });
    } catch {
      setError("Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="ornament mb-4">Private desk</p>
      <h1 className="font-display text-4xl">Author sign in</h1>
      <p className="mt-3 text-sm leading-6 text-taupe">
        Only the authorised author account can enter. Other addresses are refused.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="font-ui block text-xs uppercase tracking-widest text-taupe">
          Email
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-gold/30 bg-charcoal px-3 py-2 text-sm text-ivory"
          />
        </label>
        <label className="font-ui block text-xs uppercase tracking-widest text-taupe">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-gold/30 bg-charcoal px-3 py-2 text-sm text-ivory"
          />
        </label>
        {error && <p className="text-sm text-parchment">{error}</p>}
        <button className="btn w-full" disabled={busy} type="submit">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
