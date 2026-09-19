import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sb = getSupabase();
    const { data: sub } = sb.auth.onAuthStateChange(async (event, session) => {
      if (!session) return;
      if (event !== "INITIAL_SESSION" && event !== "SIGNED_IN") return;
      if (!isAuthorEmail(session.user.email)) {
        await sb.auth.signOut();
        setError("This desk is restricted to magdalenashade@gmail.com. Sign in with that Google account.");
        return;
      }
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

  async function signInWithGoogle() {
    setBusy(true);
    setError("");
    const sb = getSupabase();
    const { error: err } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin/login`,
        queryParams: {
          prompt: "select_account",
          login_hint: AUTHOR_EMAIL,
        },
      },
    });
    if (err) {
      setBusy(false);
      setError("Google sign-in is not available yet. The Google provider still needs to be switched on for this site.");
    }
  }

  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="ornament mb-4">Private desk</p>
      <h1 className="font-display text-4xl">Author sign in</h1>
      <p className="mt-3 text-sm leading-6 text-taupe">
        Use Google with {AUTHOR_EMAIL} only. There is no password. Any other Google account is refused.
      </p>
      {error && <p className="mt-6 text-sm text-parchment">{error}</p>}
      <button className="btn mt-8 w-full" disabled={busy} type="button" onClick={() => void signInWithGoogle()}>
        {busy ? "Opening Google…" : "Continue with Google"}
      </button>
      <p className="mt-8 text-center text-sm text-taupe">
        <Link to="/">Back to the site</Link>
      </p>
    </main>
  );
}
