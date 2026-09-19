import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Maxalena L.",
  description: "Terms of use for maxalena.com.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-5xl">Terms of Use</h1>
      <div className="gold-rule my-8" />
      <div className="space-y-5 leading-8 text-[var(--parchment)]">
        <p>By using maxalena.com you agree to read the site as a public author library and catalogue.</p>
        <p>All text, cover art, character art, and branding remain the property of Maxalena L. unless another owner is clearly credited.</p>
        <p>Retailer buttons open third-party sites. Those sites have their own terms.</p>
        <p>Nothing on this site is an offer of professional advice, and availability of a title does not guarantee a particular retailer listing.</p>
      </div>
    </div>
  );
}
