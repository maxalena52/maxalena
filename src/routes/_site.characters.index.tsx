import { createFileRoute, Link } from "@tanstack/react-router";
import { coverSrc } from "@/lib/covers";
import { shelfBooks } from "@/lib/book-copy";
import { UNIVERSES } from "@/lib/universes";
import { useLibrary } from "@/lib/use-library";

export const Route = createFileRoute("/_site/characters/")({
  head: () => ({
    meta: [
      { title: "Universes | Maxalena" },
      { name: "description", content: "The story worlds of Maxalena — desire, danger, power, and fate." },
    ],
  }),
  component: UniversesPage,
});

const PATHS = [
  { title: "Start here", body: "The bond and the affair. Blood Covenant, then Office Hours.", slug: "blood-covenant" },
  {
    title: "If you want something darker",
    body: "War, captivity, and a story that was written to kill her.",
    slug: "the-dragon-commanders-captive",
  },
  {
    title: "If you love antiheroes",
    body: "The CEO, the professor, and the bargain that stops being a bargain.",
    slug: "ceo-s-hostile-take-over",
  },
];

function UniversesPage() {
  const { books } = useLibrary();
  const shelf = shelfBooks(books);
  const bySlug = new Map(shelf.map((b) => [b.slug, b]));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <header className="mb-6 text-center">
        <h1 className="page-title text-7xl md:text-8xl">Universes</h1>
        <p className="mx-auto mt-2 max-w-2xl italic text-pink-50/90">
          Explore the story worlds of Maxalena — where power, passion, and fate refuse to behave.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {UNIVERSES.map((world) => {
          const titles = world.books.map((slug) => bySlug.get(slug)).filter(Boolean);
          const cover = titles[0] ? coverSrc(titles[0]) : null;
          return (
            <article key={world.slug} className="glass-panel grid grid-cols-[120px_1fr] gap-3 p-3 sm:grid-cols-[160px_1fr]">
              {cover && <img src={cover} alt="" className="h-full max-h-40 w-full rounded-xl object-cover" />}
              <div>
                <h2 className="font-display text-3xl text-[#ffe7a8]">{world.name}</h2>
                <p className="mt-1 text-sm leading-6 text-pink-50/90">{world.tagline}</p>
                <p className="mt-2 text-xs text-pink-100/80">Titles: {titles.map((b) => b!.title).join(" · ")}</p>
                <Link to="/characters/$slug" params={{ slug: world.slug }} className="ghost-pill mt-3 text-xs">
                  Explore universe
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <section className="glass-panel mt-4 overflow-hidden p-4 md:p-6">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-4xl text-[#ffe7a8]">Worlds of Maxalena</h2>
            <p className="mt-2 text-sm leading-6 text-pink-50/90">
              Kingdoms, offices, courts, and one novel that will not let its characters leave.
            </p>
            <Link to="/books" className="gold-pill mt-4">
              Browse the stories
            </Link>
          </div>
          <img src="/harbor-bg.png" alt="" className="h-48 w-full rounded-2xl object-cover md:h-56" />
        </div>
      </section>
      <section className="mt-6">
        <h2 className="page-title text-center text-5xl">Reading paths</h2>
        <p className="mb-4 text-center text-sm italic text-pink-50/80">Not sure where to begin? Start with one of these.</p>
        <div className="grid gap-3 md:grid-cols-3">
          {PATHS.map((path) => (
            <Link key={path.title} to="/books/$slug" params={{ slug: path.slug }} className="glass-panel block p-4 no-underline">
              <h3 className="font-display text-2xl text-[#ffe7a8]">{path.title}</h3>
              <p className="mt-2 text-sm leading-6 text-pink-50/90">{path.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
