import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Maxalena L." },
      { name: "description", content: "Cookie use on maxalena.com." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-5xl">Cookie Policy</h1>
      <div className="gold-rule my-8" />
      <div className="space-y-5 leading-8 text-parchment">
        <p>Essential cookies may be used to keep the private author session signed in.</p>
        <p>No non-essential analytics cookies are currently activated on this preview.</p>
        <p>The contact form does not set extra cookies. Submissions are stored so they can be read in the private author desk.</p>
      </div>
    </div>
  );
}
