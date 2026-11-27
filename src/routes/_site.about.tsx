import { createFileRoute } from "@tanstack/react-router";
import { DEFAULT_BIO } from "@/lib/copy";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Maxalena" },
      { name: "description", content: "An acquired taste. A questionable influence. An excellent distraction." },
    ],
  }),
  component: AboutPage,
});

const PARAS = DEFAULT_BIO.split(/\n\n+/).filter((p) => !p.startsWith("An acquired taste"));

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <section className="glass-panel p-5 md:p-8">
        <div className="grid items-center gap-6 md:grid-cols-[220px_1fr]">
          <img
            src="/author-portrait.jpg"
            alt="Portrait of Maxalena"
            className="mx-auto h-52 w-52 rounded-full border-4 border-[#ffe7a8]/70 object-cover object-[32%_16%] shadow-[0_0_30px_rgb(255_80_160/0.45)]"
          />
          <div>
            <h1 className="page-title text-6xl md:text-7xl">About Maxalena</h1>
            <div className="mt-4 space-y-4 leading-7 text-pink-50/95">
              {PARAS.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl rounded-full border border-[#ffe7a8]/50 px-6 py-3 text-center font-display text-2xl text-[#ffe7a8] italic md:text-3xl">
          “I write what you pretend not to read.”
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <Card title="The persona" body="An unreliable narrator of her own existence. A confession, an embellishment, or the beginning of another novel — that part is your problem." />
          <Card title="What she writes" body="Sensual romance, dangerous obsessions, morally complicated characters, dark fantasy, and deliciously questionable circumstances." />
          <Card title="Favourite themes" body="Desire. Power. Temptation. Intelligent seduction. Wicked humour. Beautiful villains. Formidable women. Men whose composure is worth dismantling." />
          <Card title="A few rules" body="Pleasure need not apologise. Intimacy deserves literary attention. Respect the fiction. Come curious. Leave less innocent than you arrived." />
        </div>
      </section>
    </div>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-pink-300/35 bg-black/25 p-4">
      <h2 className="font-display text-2xl text-[#ffe7a8]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-pink-50/90">{body}</p>
    </article>
  );
}
