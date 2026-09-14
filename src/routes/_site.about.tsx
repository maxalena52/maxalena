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
  "Writes best between midnight and 3am.",
  "Keeps a playlist for every book—and every character.",
  "Treats the villain’s arc as seriously as the hero’s.",
  "Will defend enemies-to-lovers as a superior trope in any debate.",
  "Her characters argue with her constantly. She lets them win sometimes.",
];

function AboutPage() {
  const { books, settings } = useLibrary();
  const copy = authorCopy(settings);
  const socials = socialLinks(settings);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="ornament mb-4 !justify-start">The Author</p>
      <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-gold/30 bg-charcoal">
        {copy.authorImage ? (
          <img src={copy.authorImage} alt="Portrait of Maxalena L." className="h-full w-full rounded-full object-cover" />
        ) : (
          <span className="font-display text-4xl text-gold">ML</span>
        )}
      </div>
      <h1 className="font-display text-5xl">Maxalena L.</h1>
      <p className="mt-2 text-gold">Dark Romance, Romantasy & Fantasy Author</p>
      <div className="gold-rule my-8" />
      <p className="leading-8 text-parchment">{copy.bio}</p>
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
      <ul className="mt-4 list-disc space-y-2 pl-5 text-taupe">
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
  );
}
