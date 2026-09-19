import Link from "next/link";
import BookCard from "@/components/BookCard";
import {
  authorCopy,
  featuredBook,
  fetchBooks,
  fetchCharacters,
  fetchSettings,
  inferGenre,
  parseReviews,
  tropesList,
  amazonUrl,
  readingUrl,
} from "@/lib/content";
import { statusLabel } from "@/lib/urls";

export const revalidate = 60;

export const metadata = {
  title: "Maxalena L. | Dark Romance & Romantasy Author",
  description:
    "Dark romance. Fantasy worlds. Characters that haunt you long after the final page.",
};

export default async function HomePage() {
  let books = [];
  let characters = [];
  let settings = {};
  let loadError = "";
  try {
    [books, characters, settings] = await Promise.all([
      fetchBooks(),
      fetchCharacters(),
      fetchSettings(),
    ]);
  } catch {
    loadError = "The library could not be reached. Please try again shortly.";
  }

  const copy = authorCopy(settings);
  const featured = featuredBook(books, settings);
  const reviews = parseReviews(settings);
  const published = books.filter((b) => (b.status || b.category) === "published");
  const ongoing = books.filter((b) => (b.status || b.category) === "ongoing");
  const soon = books.filter((b) => (b.status || "").includes("coming") || (b.category || "").includes("coming"));

  return (
    <div>
      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="ornament mb-6">Maxalena L.</p>
          <h1 className="font-display text-5xl leading-[0.95] text-[var(--ivory)] md:text-7xl">
            Stories That
            <span className="block text-[var(--gold)]">Consume You</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--taupe)]">
            Dark romance. Fantasy worlds. Characters that haunt you long after the final page.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/books" className="btn">
              Explore the Books
            </Link>
            <Link href="/about" className="btn btn-ghost">
              Meet Maxalena L.
            </Link>
          </div>
        </div>
      </section>

      {loadError && (
        <p className="mx-auto max-w-6xl px-5 text-sm text-[#e7c9b0]">{loadError}</p>
      )}

      {featured && (
        <section className="mx-auto max-w-6xl px-5 py-10">
          <p className="ornament !justify-start mb-6">Featured</p>
          <div className="card-frame grid gap-8 p-6 md:grid-cols-[280px_1fr] md:p-8">
            <Link href={`/books/${featured.slug}`} className="block">
              <div className="aspect-[2/3] overflow-hidden bg-[#120f0d]">
                {featured.cover_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.cover_url} alt={`Cover of ${featured.title}`} className="h-full w-full object-cover" />
                ) : null}
              </div>
            </Link>
            <div className="flex flex-col justify-center">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="badge">{statusLabel(featured.status, featured.category)}</span>
                <span className="tag">{inferGenre(featured.title, featured.tropes, featured.status)}</span>
              </div>
              <h2 className="font-display text-4xl text-[var(--ivory)]">{featured.title}</h2>
              {featured.blurb && <p className="mt-4 max-w-xl text-base leading-7 text-[var(--taupe)]">{featured.blurb}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {tropesList(featured, 4).map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/books/${featured.slug}`} className="btn">View Book</Link>
                {amazonUrl(featured) && (
                  <a className="btn btn-ghost" href={amazonUrl(featured)!} target="_blank" rel="noopener noreferrer">
                    Buy on Amazon
                  </a>
                )}
                {readingUrl(featured, settings) && (
                  <a className="btn btn-ghost" href={readingUrl(featured, settings)!} target="_blank" rel="noopener noreferrer">
                    Read Now
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
            <p className="ornament !justify-start mb-3">The Library</p>
            <h2 className="font-display text-4xl">Latest Releases</h2>
          </div>
          <Link href="/books" className="btn btn-ghost !min-h-9">View All</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.slice(0, 3).map((book) => (
            <BookCard key={book.id} book={book} settings={settings} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[220px_1fr]">
        <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-[rgba(198,161,91,0.28)] bg-[#120f0d]">
          {copy.authorImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={copy.authorImage} alt="Author portrait of Maxalena L." className="h-full w-full rounded-full object-cover" />
          ) : (
            <span className="font-display text-6xl text-[var(--gold)]">ML</span>
          )}
        </div>
        <div>
          <p className="ornament !justify-start mb-3">The Author</p>
          <h2 className="font-display text-4xl">Meet Maxalena L.</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--taupe)]">{copy.intro}</p>
          <Link href="/about" className="btn mt-6">Read Full Biography</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="ornament mb-3">Discovery</p>
        <h2 className="font-display mb-8 text-center text-4xl md:text-5xl">
          Enter the Worlds of Maxalena L.
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <WorldTile title="Published" count={published.length} href="/books?filter=published" />
          <WorldTile title="Ongoing Serials" count={ongoing.length} href="/books?filter=ongoing" />
          <WorldTile title="Coming Soon" count={soon.length} href="/books?filter=coming_soon" />
        </div>
        {characters.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {characters.slice(0, 4).map((c) => (
              <Link key={c.id} href="/characters" className="card-frame overflow-hidden no-underline">
                <div className="aspect-[3/4] bg-[#120f0d]">
                  {c.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.image_url} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <p className="p-3 text-center font-display text-lg">{c.name.split("(")[0]}</p>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/books" className="btn">Books</Link>
          <Link href="/characters" className="btn btn-ghost">Characters</Link>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 py-12">
          <p className="ornament mb-6">Praise</p>
          <div className="space-y-8">
            {reviews.map((r, i) => (
              <blockquote key={i} className="card-frame p-6">
                <p className="font-display text-2xl leading-snug text-[var(--parchment)]">“{r.text}”</p>
                <footer className="mt-4 text-sm text-[var(--taupe)]">
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
          <Link href="/books" className="btn">Browse All Books</Link>
          <Link href="/characters" className="btn btn-ghost">Meet the Characters</Link>
          <Link href="/about" className="btn btn-ghost">About Maxalena L.</Link>
        </div>
      </section>
    </div>
  );
}

function WorldTile({ title, count, href }: { title: string; count: number; href: string }) {
  return (
    <Link href={href} className="card-frame p-6 no-underline">
      <p className="font-display text-2xl text-[var(--ivory)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--taupe)]">{count} {count === 1 ? "title" : "titles"}</p>
    </Link>
  );
}
