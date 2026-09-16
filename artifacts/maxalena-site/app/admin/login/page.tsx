"use client";

import { FormEvent, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { error: err } = await getBrowserSupabase().auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
      else router.replace("/admin");
    } catch {
      setError("Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="ornament mb-4">Private desk</p>
      <h1 className="font-display text-4xl">Author sign in</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="font-ui block text-xs uppercase tracking-[0.16em] text-[var(--taupe)]">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-[rgba(198,161,91,0.3)] bg-[#120f0d] px-3 py-2 text-sm"
          />
        </label>
        <label className="font-ui block text-xs uppercase tracking-[0.16em] text-[var(--taupe)]">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-[rgba(198,161,91,0.3)] bg-[#120f0d] px-3 py-2 text-sm"
          />
        </label>
        {error && <p className="text-sm text-[#e7c9b0]">{error}</p>}
        <button className="btn w-full" disabled={busy} type="submit">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
