import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Maxalena L." },
      { name: "description", content: "Terms of use for maxalena.com." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-5xl">Terms of Use</h1>
      <div className="gold-rule my-8" />
      <div className="space-y-5 leading-8 text-parchment">
        <p>By using this site you agree to read it as a public author library and catalogue.</p>
        <p>All text, cover art, character art, and branding remain the property of Maxalena L. unless another owner is clearly credited.</p>
        <p>Retailer buttons open third-party sites. Those sites have their own terms.</p>
        <p>Availability of a title does not guarantee a particular retailer listing.</p>
      </div>
    </div>
  );
}
