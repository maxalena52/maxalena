import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Maxalena L.",
  description: "Cookie use on maxalena.com.",
};

export default function CookiesPage() {
  const ga = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-5xl">Cookie Policy</h1>
      <div className="gold-rule my-8" />
      <div className="space-y-5 leading-8 text-[var(--parchment)]">
        <p>Essential cookies may be used to keep the private author session signed in.</p>
        {ga ? (
          <p>Google Analytics is configured on this site and may set measurement cookies. IP anonymisation is requested where supported.</p>
        ) : (
          <p>No non-essential analytics cookies are currently activated.</p>
        )}
        <p>This site does not set cookies for newsletters or contact forms.</p>
      </div>
    </div>
  );
}
