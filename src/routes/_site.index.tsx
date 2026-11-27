import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useLibrary } from "@/lib/use-library";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "MAXALENA | I write what you pretend not to read" },
      {
        name: "description",
        content: "Romantasy, dark fantasy, noir, and beautifully unconventional worlds.",
      },
    ],
  }),
  component: HomePage,
});

const GENRES = ["Romantasy", "Dark Fantasy", "Webnovel", "Serial", "Thriller", "Bite-Size Fiction"];

const FEATURED = [
  { slug: "ceo-s-hostile-take-over", title: "The CEO's Hostile Takeover", cover: "/covers/ceo-s-hostile-take-over.jpg" },
  { slug: "office-hours", title: "Office Hours", cover: "/covers/office-hours.jpg" },
  { slug: "blood-covenant", title: "Blood Covenant", cover: "/covers/blood-covenant.jpg" },
  { slug: "the-dragon-commanders-captive", title: "The Dragon Commander's Captive", cover: "/covers/the-dragon-commanders-captive.jpg" },
  { slug: "grim-reaper-chaos", title: "Transmigrated into a Novel and Trapped the Grim Reaper", cover: "/covers/grim-reaper-chaos.png" },
  { slug: "the-emperors-black-widow", title: "The Emperor's Black Widow", cover: "/covers/the-emperors-black-widow.jpg" },
  { slug: "the-algorithm-of-vengeance", title: "The Algorithm of Vengeance", cover: "/covers/the-algorithm-of-vengeance.jpg" },
] as const;

function HomePage() {
  const { books } = useLibrary();
  const [start, setStart] = useState(0);
  const shown = useMemo(() => {
    const out = [];
    for (let i = 0; i < FEATURED.length; i++) out.push(FEATURED[(start + i) % FEATURED.length]);
    return out;
  }, [start]);
  const known = new Set(books.map((b) => b.slug));

  return (
    <div className="mx-auto max-w-[1180px] px-3 pb-6 pt-3 md:px-4">
      <section className="overflow-hidden rounded-[28px] border-2 border-pink-400/70 shadow-[0_0_28px_rgb(255_60_170/0.45)]">
        <img
          src="/hero-banner.png"
          alt="MAXALENA — I write what you pretend not to read"
          className="block h-auto w-full"
        />
      </section>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <Link to="/books" className="neon-pill">
          Explore Stories →
        </Link>
        <Link to="/about" className="neon-pill">
          Read the Journal →
        </Link>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {GENRES.map((g) => (
          <Link key={g} to="/books" className="neon-pill text-xs">
            {g}
          </Link>
        ))}
      </div>

      <section className="neon-panel mt-4 p-3 md:p-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#ffe27a]">Featured Stories</h2>
          <Link to="/books" className="text-sm text-pink-100 no-underline hover:text-[#ffe27a]">
            View All Stories →
          </Link>
        </div>
        <div className="flex items-stretch gap-2">
          <button
            type="button"
            aria-label="Previous stories"
            className="hidden w-8 shrink-0 rounded-full border border-pink-300/50 text-white sm:block"
            onClick={() => setStart((s) => (s - 1 + FEATURED.length) % FEATURED.length)}
          >
            ‹
          </button>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
            {shown.map((book) => {
              const live = known.has(book.slug);
              const card = (
                <>
                  <img src={book.cover} alt="" className="aspect-[3/4] w-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-1.5 pb-2 pt-8 text-center font-display text-sm font-semibold leading-tight text-white">
                    {book.title}
                  </span>
                </>
              );
              return live ? (
                <Link
                  key={book.slug}
                  to="/books/$slug"
                  params={{ slug: book.slug }}
                  className="group relative overflow-hidden rounded-2xl border border-pink-300/40 no-underline"
                >
                  {card}
                </Link>
              ) : (
                <div key={book.slug} className="relative overflow-hidden rounded-2xl border border-pink-300/40">
                  {card}
                </div>
              );
            })}
          </div>
          <button
            type="button"
            aria-label="Next stories"
            className="hidden w-8 shrink-0 rounded-full border border-pink-300/50 text-white sm:block"
            onClick={() => setStart((s) => (s + 1) % FEATURED.length)}
          >
            ›
          </button>
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <Panel
          title="Story Universes"
          body="The worlds, kingdoms, cities, and secret systems behind the stories."
          cta="Explore Universes →"
          to="/characters"
        />
        <Panel
          title="New & Noteworthy"
          body="Latest releases, ongoing serials, updates, and special features."
          cta="See What's New →"
          to="/books"
        />
        <Panel
          title="Author Journal"
          body="Behind the stories: thoughts, process, inspiration, travel, and creative musings."
          cta="Read the Journal →"
          to="/about"
        />
      </section>
    </div>
  );
}

function Panel({ title, body, cta, to }: { title: string; body: string; cta: string; to: "/books" | "/characters" | "/about" }) {
  return (
    <div className="neon-panel flex flex-col p-5">
      <h3 className="font-display text-3xl font-semibold tracking-tight text-[#ffe27a]">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-pink-50/90">{body}</p>
      <Link to={to} className="neon-pill mt-4 w-fit text-sm">
        {cta}
      </Link>
    </div>
  );
}
