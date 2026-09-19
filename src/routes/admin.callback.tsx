import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { finishGoogleLogin } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/callback")({
  head: () => ({
    meta: [
      { title: "Author sign in | Maxalena L." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminCallbackPage,
});

function AdminCallbackPage() {
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code") || "";
    const state = params.get("state") || "";
    if (!code || !state) {
      setError("Sign-in was cancelled.");
      return;
    }
    void finishGoogleLogin({ data: { code, state } })
      .then(() => {
        window.location.replace("/admin");
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "This desk is private.");
      });
  }, []);

  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="ornament mb-4">Private desk</p>
      <h1 className="font-display text-4xl">Author sign in</h1>
      <p className="mt-3 text-sm leading-6 text-taupe">{error || "Finishing sign-in…"}</p>
      {error && (
        <a className="btn mt-8 inline-flex justify-center" href="/admin/login">
          Try again
        </a>
      )}
    </main>
  );
}
