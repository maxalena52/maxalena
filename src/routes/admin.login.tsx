import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { startGoogleLogin, verifyAuthorSession } from "@/lib/admin-auth";

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
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void verifyAuthorSession().then(() => {
      window.location.replace("/admin");
    }).catch(() => {
      /* stay on login */
    });
  }, []);

  async function signInWithGoogle() {
    setBusy(true);
    setError("");
    try {
      const { url } = await startGoogleLogin();
      window.location.href = url;
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Google sign-in is not configured on Vercel yet.");
    }
  }

  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="ornament mb-4">Private desk</p>
      <h1 className="font-display text-4xl">Author sign in</h1>
      <p className="mt-3 text-sm leading-6 text-taupe">
        Continue with Google. Only the authorised account can enter.
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
