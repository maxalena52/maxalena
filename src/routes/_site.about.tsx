import { createFileRoute, Link } from "@tanstack/react-router";
import { authorCopy, socialLinks } from "@/lib/content";
import { useLibrary } from "@/lib/use-library";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Maxalena L. | Dark Romance & Fantasy Author" },
      {
        name: "description",
        content:
          "Biography of Maxalena L., author of dark romance, romantasy, gothic fiction, and forbidden contemporary stories.",
      },
    ],
  }),
  component: AboutPage,
});

const FACTS = [
  "“My imagination has never been particularly well-behaved.”",
  "“I write fiction. My alibis are considerably less convincing.”",
  "“Some chapters are best enjoyed with the door closed.”",
  "“I have impeccable taste in fictional men and questionable taste in their intentions.”",
  "“I make no apologies for the temperature of my prose.”",
  "“Literary merit and indecent thoughts are not mutually exclusive.”",
  "“Respectability is a dress code, not a personality.”",
  "“Not everything I write is a confession. How unfortunate for the curious.”",
  "“I prefer my characters complicated, my dialogue intelligent, and my fictional affairs thoroughly inconvenient.”",
  "“My private life is not available for publication. My imagination, however, is remarkably affordable.”",
];

function AboutPage() {
  const { books, settings } = useLibrary();
  const copy = authorCopy(settings);
  const socials = socialLinks(settings);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="read-panel p-6 md:p-10">
      <p className="ornament mb-4 !justify-start">The Author</p>
      <img
        src={copy.authorImage || "/author-portrait.jpg"}
        alt="Portrait of Maxalena L."
        className="mb-8 h-64 w-48 rounded-2xl border border-pink-300/40 object-cover object-[32%_18%] sm:h-72 sm:w-56"
      />
      <h1 className="font-display text-5xl">Maxalena</h1>
      <p className="mt-2 text-gold">An acquired taste. A questionable influence. An excellent distraction.</p>
      <div className="gold-rule my-8" />
      <div className="space-y-5 leading-8 text-parchment">
        {copy.bio
          .split(/\n\n+/)
          .filter((p) => p.trim() && !p.startsWith("An acquired taste"))
          .map((p) => (
            <p key={p}>{p}</p>
          ))}
      </div>
      <h2 className="font-display mt-12 text-3xl">Themes</h2>
      <p className="mt-3 leading-8 text-taupe">
        Forbidden love. Soul-bonds and broken oaths. Hunters and the hunted. Slow-burn obsession. Worlds that blur the
        line between light and shadow.
      </p>
      {books.length > 0 && (
        <>
          <h2 className="font-display mt-12 text-3xl">Selected works</h2>
          <ul className="mt-4 space-y-2">
            {books.map((b) => (
              <li key={b.id}>
                <Link to="/books/$slug" params={{ slug: b.slug }}>
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <h2 className="font-display mt-12 text-3xl">Notes from the desk</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-parchment">
        {FACTS.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {socials.length > 0 && (
        <>
          <h2 className="font-display mt-12 text-3xl">Find Maxalena L. online</h2>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-10 flex gap-3">
        <Link to="/books" className="btn">
          Books
        </Link>
        <Link to="/characters" className="btn btn-ghost">
          Characters
        </Link>
      </div>
      </div>
    </div>
  );
}
