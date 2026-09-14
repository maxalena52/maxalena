import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/copyright")({
  head: () => ({
    meta: [
      { title: "Copyright and Takedown | Maxalena L." },
      { name: "description", content: "Copyright notice for works by Maxalena L." },
    ],
  }),
  component: CopyrightPage,
});

function CopyrightPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-5xl">Copyright and Takedown</h1>
      <div className="gold-rule my-8" />
      <div className="space-y-5 leading-8 text-parchment">
        <p>Books, character art, cover images, and site copy published here are protected by copyright belonging to Maxalena L. unless otherwise stated.</p>
        <p>Unauthorised reproduction of complete works is not permitted.</p>
        <p>Rights-holder notices may be submitted when a genuine public contact method is published on this site.</p>
      </div>
    </div>
  );
}
