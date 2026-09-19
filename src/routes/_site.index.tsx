import { createFileRoute, Link } from "@tanstack/react-router";
import { BookCard } from "@/components/book-card";
import { BookGridSkeleton } from "@/components/book-skeleton";
import {
  authorCopy,
  featuredBook,
  groupBooks,
  parseReviews,
  tropesList,
  amazonUrl,
} from "@/lib/content";
import { inferGenre } from "@/lib/copy";
import { coverSrc } from "@/lib/covers";
import { useLibrary } from "@/lib/use-library";
import { statusLabel } from "@/lib/urls";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Maxalena L. | Dark Romance & Romantasy Author" },
      {
        name: "description",
        content: "Dark romance. Fantasy worlds. Characters that haunt you long after the final page.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { books, characters, settings, loading, error, refetch } = useLibrary();
  const copy = authorCopy(settings);
  const featured = featuredBook(books, settings);
  const reviews = parseReviews(settings);
  const groups = groupBooks(books);

  return (
    <div>
      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="ornament mb-6">Maxalena L.</p>
          <h1 className="font-display text-5xl leading-none text-ivory md:text-7xl">
            Stories That
            <span className="block text-gold">Consume You</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-taupe">
            Dark romance. Fantasy worlds. Characters that haunt you long after the final page.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/books" className="btn">
              Explore the Books
            </Link>
            <Link to="/about" className="btn btn-ghost">
              Meet Maxalena L.
            </Link>
          </div>
        </div>
      </section>

      {error && (
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm text-parchment">The library could not be reached.</p>
          <button type="button" className="btn mt-3" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {featured && (
        <section className="mx-auto max-w-6xl px-5 py-10">
          <p className="ornament mb-6 !justify-start">Featured</p>
          <div className="card-frame grid gap-8 p-6 md:grid-cols-[280px_1fr] md:p-8">
            <Link to="/books/$slug" params={{ slug: featured.slug }} className="block">
              <div className="aspect-cover overflow-hidden bg-charcoal">
                {coverSrc(featured) ? (
                  <img src={coverSrc(featured)!} alt={`Cover of ${featured.title}`} className="h-full w-full object-cover" />
                ) : null}
              </div>
            </Link>
            <div className="flex flex-col justify-center">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="badge">{statusLabel(featured.status, featured.category)}</span>
                <span className="tag">{inferGenre(featured.title, featured.tropes, featured.status)}</span>
              </div>
              <h2 className="font-display text-4xl text-ivory">{featured.title}</h2>
              {featured.blurb && <p className="mt-4 max-w-xl text-base leading-7 text-taupe">{featured.blurb}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {tropesList(featured, 4).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/books/$slug" params={{ slug: featured.slug }} className="btn">
                  View Book
                </Link>
                <Link to="/books/$slug/preview" params={{ slug: featured.slug }} className="btn btn-ghost">
                  Read sample
                </Link>
                {amazonUrl(featured) && (
                  <a className="btn btn-ghost" href={amazonUrl(featured)!} target="_blank" rel="noopener noreferrer">
                    Buy on Amazon
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="ornament mb-3 !justify-start">The Library</p>
            <h2 className="font-display text-4xl">Latest Releases</h2>
          </div>
          <Link to="/books" className="btn btn-ghost min-h-9">
            View All
          </Link>
        </div>
        {loading ? (
          <BookGridSkeleton count={3} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.slice(0, 3).map((book) => (
              <BookCard key={book.id} book={book} settings={settings} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[220px_1fr]">
        <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-gold/30 bg-charcoal">
          {copy.authorImage ? (
            <img src={copy.authorImage} alt="Author portrait of Maxalena L." className="h-full w-full rounded-full object-cover" />
          ) : (
            <span className="font-display text-6xl text-gold">ML</span>
          )}
        </div>
        <div>
          <p className="ornament mb-3 !justify-start">The Author</p>
          <h2 className="font-display text-4xl">Meet Maxalena L.</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-taupe">{copy.intro}</p>
          <Link to="/about" className="btn mt-6">
            Read Full Biography
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="ornament mb-3">Discovery</p>
        <h2 className="font-display mb-8 text-center text-4xl md:text-5xl">Enter the Worlds of Maxalena L.</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <WorldTile title="Published" count={loading ? null : groups.published.length} to="/books" />
          <WorldTile title="Ongoing Serials" count={loading ? null : groups.ongoing.length} to="/books" />
          <WorldTile title="Coming Soon" count={loading ? null : groups.coming.length} to="/books" />
        </div>
        {characters.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {characters.slice(0, 4).map((c) => (
              <Link key={c.id} to="/characters" className="card-frame overflow-hidden no-underline">
                <div className="aspect-portrait bg-charcoal">
                  {c.image_url ? <img src={c.image_url} alt="" className="h-full w-full object-cover" /> : null}
                </div>
                <p className="font-display p-3 text-center text-lg">{c.name.split("(")[0]}</p>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/books" className="btn">
            Books
          </Link>
          <Link to="/characters" className="btn btn-ghost">
            Characters
          </Link>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 py-12">
          <p className="ornament mb-6">Praise</p>
          <div className="space-y-8">
            {reviews.map((r, i) => (
              <blockquote key={i} className="card-frame p-6">
                <p className="font-display text-2xl leading-snug text-parchment">“{r.text}”</p>
                <footer className="mt-4 text-sm text-taupe">
                  {r.reviewer}
                  {r.source ? ` — ${r.source}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <div className="gold-rule mb-8" />
        <h2 className="font-display text-4xl">Every book is a world waiting to swallow you whole.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/books" className="btn">
            Browse All Books
          </Link>
          <Link to="/characters" className="btn btn-ghost">
            Meet the Characters
          </Link>
          <Link to="/about" className="btn btn-ghost">
            About Maxalena L.
          </Link>
        </div>
      </section>
    </div>
  );
}

function WorldTile({ title, count, to }: { title: string; count: number | null; to: "/books" }) {
  return (
    <Link to={to} className="card-frame p-6 no-underline">
      <p className="font-display text-2xl text-ivory">{title}</p>
      {count === null ? (
        <div className="skeleton mt-2 h-4 w-16" />
      ) : (
        <p className="mt-2 text-sm text-taupe">
          {count} {count === 1 ? "title" : "titles"}
        </p>
      )}
    </Link>
  );
}
