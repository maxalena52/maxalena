import { createFileRoute, Link } from "@tanstack/react-router";
import { shelfBooks } from "@/lib/book-copy";
import { coverSrc } from "@/lib/covers";
import { universeBySlug, type UniIcon } from "@/lib/universes";
import { useLibrary } from "@/lib/use-library";

export const Route = createFileRoute("/_site/characters/$slug")({
  head: ({ params }) => {
    const world = universeBySlug(params.slug);
    const title = world ? `The ${world.name} Universe | Maxalena` : "Universe | Maxalena";
    return {
      meta: [
        { title },
        { name: "description", content: world?.tagline || "A story universe by Maxalena." },
      ],
    };
  },
  component: UniversePage,
});

function UniversePage() {
  const { slug } = Route.useParams();
  const world = universeBySlug(slug);
  const { books } = useLibrary();
  const shelf = shelfBooks(books);

  if (!world) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="page-title text-6xl">Universe not found</h1>
        <Link to="/characters" className="gold-pill mt-8">
          All universes
        </Link>
      </div>
    );
  }

  const titles = world.books.map((id) => shelf.find((b) => b.slug === id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-3 py-6 md:px-5">
      <nav className="mb-3 text-sm text-pink-100/80" aria-label="Breadcrumb">
        <Link to="/" className="no-underline">
          Home
        </Link>
        <span> / </span>
        <Link to="/characters" className="no-underline">
          Universes
        </Link>
        <span> / </span>
        <span className="text-[#ffe7a8]">{world.name} Universe</span>
      </nav>

      {world.bakedHero ? (
        <img src={world.hero} alt={`The ${world.name} Universe`} className="uni-hero-baked" />
      ) : (
        <section className="uni-hero">
          <img src={world.hero} alt="" />
          <div className="uni-hero-copy">
            <p className="uni-kicker">The</p>
            <h1>{world.name}</h1>
            <p className="uni-kicker">Universe</p>
            <p className="uni-tagline">{world.tagline}</p>
          </div>
        </section>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="uni-panel">
          <h2>About This Universe</h2>
          {world.about.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </section>
        <section className="uni-panel">
          <h2 className="flex items-center gap-2">
            <Mark name="rose" /> Key Elements
          </h2>
          <ul className="uni-elements">
            {world.elements.map((item) => (
              <li key={item.text}>
                <Mark name={item.icon} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="uni-panel mt-4">
        <div className="uni-world-head">
          <h2 className="flex items-center gap-2">
            <Mark name="compass" /> The Universe of This Story
          </h2>
          <p>{world.worldLine}</p>
        </div>
        <div className="uni-scenes">
          {world.scenes.map((scene) => (
            <img key={scene.src} src={scene.src} alt={scene.alt} />
          ))}
        </div>
      </section>

      <section className="uni-mood mt-4">
        <div className="uni-mood-title">
          <Mark name="quill" />
          <div>
            <h2>The Mood & Vibe</h2>
          </div>
        </div>
        <div className="uni-moods">
          {world.moods.map((mood) => (
            <div key={mood.label}>
              <Mark name={mood.icon} />
              <span>{mood.label}</span>
            </div>
          ))}
        </div>
      </section>

      {titles.length > 0 && (
        <section className="uni-panel mt-4">
          <h2>Stories in this universe</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {titles.map((book) => (
              <Link key={book!.slug} to="/books/$slug" params={{ slug: book!.slug }} className="flex gap-3 no-underline">
                {coverSrc(book!) && <img src={coverSrc(book!)!} alt="" className="h-24 w-16 rounded-lg object-cover" />}
                <span>
                  <span className="block font-display text-xl text-white">{book!.title}</span>
                  <span className="mt-1 line-clamp-3 block text-sm text-pink-50/80">{book!.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Mark({ name }: { name: UniIcon }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true };
  return (
    <svg className="uni-mark" {...common}>
      {name === "rose" && <path d="M12 21s-6-3.4-6-8a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-6 8-8 8z" />}
      {name === "crown" && <path d="M3 17h18l-1.5-8-4.5 4L12 6l-3 7-4.5-4L3 17z" />}
      {name === "heart" && <path d="M12 19s-7-4.2-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.8-7 9-7 9z" />}
      {name === "swords" && <path d="M7 4l10 10M17 4L7 14M5 19l4-4M19 19l-4-4" />}
      {name === "lotus" && <path d="M12 19c-4-3-6-6-6-8 2 0 4 1 6 3 2-2 4-3 6-3 0 2-2 5-6 8zM12 14c-2-3-2-6 0-8 2 2 2 5 0 8z" />}
      {name === "infinity" && <path d="M7 12c1.8-2.4 3.2-2.4 5 0s3.2 2.4 5 0c1.4-1.8.4-3-1.2-3-2 0-3.2 2-3.8 3-.6-1-1.8-3-3.8-3C6.6 9 5.6 10.2 7 12z" />}
      {name === "moon" && <path d="M16 4a8 8 0 1 0 4 12 6 6 0 0 1-4-12z" />}
      {name === "hourglass" && <path d="M6 4h12M6 20h12M7 4c0 4 5 5 5 8s-5 4-5 8M17 4c0 4-5 5-5 8s5 4 5 8" />}
      {name === "flame" && <path d="M12 21c4 0 6-3 6-6 0-4-3-5-3-8 0 2-2 3-3 3-2-3-1-7 1-9-5 2-8 6-8 10 0 5 3 10 7 10z" />}
      {name === "fleur" && <path d="M12 12c2-3 2-6 0-6s-2 3 0 6zm0 0c-2-3-2-6 0-6s2 3 0 6zm0 0c3 2 6 2 6 0s-3-2-6 0zm0 0c-3 2-6 2-6 0s3-2 6 0zM12 12v8" />}
      {name === "peaks" && <path d="M3 18l5-8 4 5 3-4 6 7H3z" />}
      {name === "compass" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M14.5 9.5l-1 4-4 1 1-4 4-1z" />
        </>
      )}
      {name === "quill" && <path d="M20 4c-6 1-10 5-12 9l-3 7 7-3c4-2 8-6 9-12zM8 16l2 2" />}
    </svg>
  );
}
