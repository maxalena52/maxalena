import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_site/journal")({
  head: () => ({
    meta: [
      { title: "Journal | Maxalena" },
      { name: "description", content: "Articles, notes, and updates from the worlds of Maxalena." },
    ],
  }),
  component: JournalPage,
});

const TABS = ["Writing", "Updates", "Worldbuilding", "Recommendations", "Essays"] as const;

const POSTS = [
  {
    id: "heat",
    tab: "Writing" as const,
    kicker: "Featured",
    title: "Behind the heat",
    summary: "A closer look at how the stories are written — from the first inconvenient spark to full combustion.",
    body: "She writes for the curious and the unashamed. Intimacy gets the same attention as tragedy, pleasure does not apologise, and a perfectly respectable imagination is a terribly underutilised one. The heat is never decoration. It is where the characters stop behaving.",
  },
  {
    id: "notes",
    tab: "Writing" as const,
    kicker: "Writing",
    title: "Writing notes",
    summary: "On process, habits, and the little rituals that keep the pages coming.",
    body: "“My imagination has never been particularly well-behaved.” Some chapters are best enjoyed with the door closed. The work happens late, and the characters are allowed to win the argument.",
  },
  {
    id: "updates",
    tab: "Updates" as const,
    kicker: "Updates",
    title: "Story updates",
    summary: "What is on the desk: Blood Covenant, Office Hours, the Dragon Commander, and the rest of the shelf.",
    body: "The library on this site is the current shelf. Covers, hooks, and warnings are updated here first. New titles appear on Stories when they are ready to be read.",
  },
  {
    id: "trust",
    tab: "Worldbuilding" as const,
    kicker: "Worldbuilding",
    title: "Characters I should not trust",
    summary: "A very subjective list of charming, dangerous, and suspicious people from the stories.",
    body: "Hunters who become shields. Professors who meant it as revenge. CEOs who refuse to give the acquisition back. Death, stuck inside a novel. None of them are safe, and that is the point.",
  },
  {
    id: "midnight",
    tab: "Essays" as const,
    kicker: "Essays",
    title: "Midnight musings",
    summary: "Late thoughts on stories, desire, and the useful chaos of being a writer.",
    body: "“I make no apologies for the temperature of my prose.” Literary merit and indecent thoughts are not mutually exclusive. Respectability is a dress code, not a personality.",
  },
  {
    id: "recs",
    tab: "Recommendations" as const,
    kicker: "Recommendations",
    title: "Where to start",
    summary: "If you want the bond, the office, or the war.",
    body: "Start with Blood Covenant for the hunter and the witch. Office Hours if you want the argument that turns into an affair. The Dragon Commander's Captive if captivity is the love story.",
  },
];

function JournalPage() {
  const [tab, setTab] = useState<(typeof TABS)[number] | "All">("All");
  const [open, setOpen] = useState("heat");
  const posts = POSTS.filter((p) => tab === "All" || p.tab === tab);
  const featured = POSTS[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <section className="glass-panel p-5 md:p-8">
        <header className="text-center">
          <h1 className="page-title text-7xl md:text-8xl">Journal</h1>
          <p className="mt-2 italic text-pink-50/90">Articles, notes, and updates from the worlds of Maxalena.</p>
        </header>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button type="button" className={tab === "All" ? "gold-pill" : "ghost-pill"} onClick={() => setTab("All")}>
            All
          </button>
          {TABS.map((t) => (
            <button key={t} type="button" className={tab === t ? "gold-pill" : "ghost-pill"} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {(tab === "All" || tab === "Writing") && (
          <article className="mt-6 grid gap-4 rounded-2xl border border-[#ffe7a8]/30 bg-black/20 p-4 md:grid-cols-[280px_1fr]">
            <img src="/harbor-bg.png" alt="" className="h-48 w-full rounded-xl object-cover md:h-full" />
            <div>
              <p className="text-xs tracking-[0.25em] text-[#ffe7a8] uppercase">Featured article</p>
              <h2 className="mt-1 font-display text-4xl text-[#ffe7a8]">{featured.title}</h2>
              <p className="mt-2 italic text-pink-50/90">{featured.summary}</p>
              {open === featured.id && <p className="mt-3 leading-7 text-pink-50/90">{featured.body}</p>}
              <button type="button" className="ghost-pill mt-4" onClick={() => setOpen(featured.id)}>
                Read article
              </button>
            </div>
          </article>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts
            .filter((p) => p.id !== "heat")
            .map((post) => (
              <article key={post.id} className="flex flex-col rounded-2xl border border-pink-300/30 bg-black/25 p-4">
                <p className="text-[0.65rem] tracking-[0.2em] text-[#ffe7a8] uppercase">{post.kicker}</p>
                <h3 className="mt-1 font-display text-2xl text-white">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-pink-50/85">{open === post.id ? post.body : post.summary}</p>
                <button type="button" className="ghost-pill mt-4" onClick={() => setOpen(post.id)}>
                  {open === post.id ? "Reading" : "Read article"}
                </button>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
