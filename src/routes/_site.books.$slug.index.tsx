import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { WarningPanel } from "@/components/warning-panel";
import { amazonUrl, goodreadsUrl, tropesList, warningsList } from "@/lib/content";
import { coverSrc } from "@/lib/covers";
import { characterDisplayName, characterPublicCopy, cleanText, inferGenre } from "@/lib/copy";
import { useLibrary } from "@/lib/use-library";
import { statusLabel } from "@/lib/urls";
import type { Book } from "@/lib/types";

export const Route = createFileRoute("/_site/books/$slug/")({
  head: ({ params }) => ({
    meta: [{ title: `${params.slug} | Maxalena L.` }],
  }),
  component: BookDetailPage,
});

function BookDetailPage() {
  const { slug } = Route.useParams();
  const { books, characters, loading, error, refetch } = useLibrary();
  const book = books.find((b) => b.slug === slug);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="skeleton h-8 w-40" />
        <div className="mt-8 grid gap-10 md:grid-cols-[280px_1fr]">
          <div className="skeleton aspect-cover" />
          <div className="space-y-4">
            <div className="skeleton h-10 w-2/3" />
            <div className="skeleton h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <p>This volume could not be loaded.</p>
        <button type="button" className="btn mt-4" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="ornament mb-4">404</p>
        <h1 className="font-display text-4xl">This volume is not in the library</h1>
        <p className="mt-4 text-taupe">The slug does not match a published title.</p>
        <Link to="/books" className="btn mt-8">
          Explore the Books
        </Link>
      </div>
    );
  }

  return <BookLoaded book={book} characters={characters} books={books} />;
}

function BookLoaded({
  book,
  characters,
  books,
}: {
  book: Book;
  characters: ReturnType<typeof useLibrary>["characters"];
  books: Book[];
}) {
  const relatedChars = characters.filter((c) => c.book_id === book.id);
  const relatedBooks = books.filter((b) => b.id !== book.id).slice(0, 3);
  const warnings = warningsList(book);
  const mature = warnings.some((w) => /18\+|smut|explicit|mature/i.test(w));
  const amazon = amazonUrl(book);
  const goodreads = goodreadsUrl(book);
  const coming = statusLabel(book.status, book.category) === "Coming Soon";
  const synopsis = cleanText(book.synopsis).split(/\n\n+/).filter(Boolean);
  const art = (book.character_art_urls || []).filter(Boolean);
  const genre = inferGenre(book.title, book.tropes, book.status);

  useEffect(() => {
    document.title = `${book.title} by Maxalena L. | ${genre}`;
  }, [book.title, genre]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <nav className="font-ui mb-8 text-xs uppercase tracking-widest text-taupe" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/books">Books</Link>
        <span> / </span>
        <span className="text-parchment">{book.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        <div className="aspect-cover overflow-hidden bg-charcoal">
          {coverSrc(book) ? (
            <img src={coverSrc(book)!} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
          ) : (
            <div className="font-display flex h-full items-center justify-center text-5xl text-gold">ML</div>
          )}
        </div>
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className={coming ? "badge badge-ox" : "badge"}>{statusLabel(book.status, book.category)}</span>
            <span className="tag">{genre}</span>
          </div>
          <h1 className="font-display text-5xl leading-tight">{book.title}</h1>
          {book.blurb && <p className="mt-4 text-lg leading-8 text-taupe">{book.blurb}</p>}
          <div className="mt-5 flex flex-wrap gap-2">
            {tropesList(book).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/books/$slug/preview" params={{ slug: book.slug }} className="btn">
              Read sample
            </Link>
            {amazon && (
              <a className="btn btn-ghost" href={amazon} target="_blank" rel="noopener noreferrer">
                Buy on Amazon
              </a>
            )}
            {goodreads && (
              <a className="btn btn-ghost" href={goodreads} target="_blank" rel="noopener noreferrer">
                Goodreads
              </a>
            )}
            {coming && !amazon && <span className="badge badge-ox">Coming Soon</span>}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <WarningPanel warnings={warnings} mature={mature} />
      </div>

      {synopsis.length > 0 && (
        <section className="mx-auto mt-14 max-w-xl">
          <h2 className="font-display mb-4 text-3xl">Synopsis</h2>
          {synopsis.map((p) => (
            <p key={p.slice(0, 24)} className="mb-4 leading-8 text-parchment">
              {p}
            </p>
          ))}
        </section>
      )}

      {relatedChars.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-3xl">Characters</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {relatedChars.map((c) => {
              const desc = characterPublicCopy(c.name, c.description);
              return (
                <article key={c.id} className="card-frame flex gap-4 p-4">
                  <div className="h-28 w-24 shrink-0 overflow-hidden bg-charcoal">
                    {c.image_url ? <img src={c.image_url} alt="" className="h-full w-full object-cover" /> : null}
                  </div>
                  <div>
                    <p className="badge mb-2">{c.role || "Character"}</p>
                    <h3 className="font-display text-2xl">{characterDisplayName(c.name)}</h3>
                    <p className="mt-2 text-sm leading-6 text-taupe">
                      {desc.slice(0, 220)}
                      {desc.length > 220 ? "…" : ""}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <Link to="/characters" className="btn btn-ghost mt-6">
            All characters
          </Link>
        </section>
      )}

      {art.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-3xl">Character art</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {art.map((src) => (
              <img key={src} src={src} alt="" className="w-full object-cover" />
            ))}
          </div>
        </section>
      )}

      {relatedBooks.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-3xl">Further into the library</h2>
          <ul className="space-y-2 text-parchment">
            {relatedBooks.map((b) => (
              <li key={b.id}>
                <Link to="/books/$slug" params={{ slug: b.slug }}>
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
