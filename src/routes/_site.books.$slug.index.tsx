import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { shelfBooks } from "@/lib/book-copy";
import { warningsList } from "@/lib/content";
import { coverSrc } from "@/lib/covers";
import { characterDisplayName, characterPublicCopy, cleanText, inferGenre } from "@/lib/copy";
import { useLibrary } from "@/lib/use-library";
import type { Book } from "@/lib/types";

export const Route = createFileRoute("/_site/books/$slug/")({
  head: ({ params }) => ({
    meta: [{ title: `${params.slug} | Maxalena` }],
  }),
  component: BookDetailPage,
});

function BookDetailPage() {
  const { slug } = Route.useParams();
  const { books, characters } = useLibrary();
  const shelf = shelfBooks(books);
  const book = shelf.find((b) => b.slug === slug);

  if (!book) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="page-title text-6xl">Not in the library</h1>
        <Link to="/books" className="gold-pill mt-8">
          All stories
        </Link>
      </div>
    );
  }

  return <BookLoaded book={book} characters={characters} books={shelf} />;
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
  const related = books.filter((b) => b.slug !== book.slug).slice(0, 2);
  const warnings = warningsList(book);
  const mature = warnings.some((w) => /18\+|smut|explicit|mature/i.test(w));
  const synopsis = cleanText(book.synopsis).split(/\n\n+/).filter(Boolean);
  const genre = inferGenre(book.title, book.tropes, book.status);
  const tropes = (book.tropes || []).filter(Boolean);
  const tags = [genre, ...tropes].filter((v, i, a) => v && a.indexOf(v) === i).slice(0, 4);
  const excerpt = cleanText(book.sample_chapter) || synopsis[0] || book.blurb || "";
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    document.title = `${book.title} | Maxalena`;
    try {
      const raw = localStorage.getItem("maxalena-library");
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      setSaved(list.includes(book.slug));
    } catch {
      setSaved(false);
    }
  }, [book.slug, book.title]);

  function toggleSaved() {
    const next = !saved;
    setSaved(next);
    try {
      const raw = localStorage.getItem("maxalena-library");
      const list = new Set(raw ? (JSON.parse(raw) as string[]) : []);
      if (next) list.add(book.slug);
      else list.delete(book.slug);
      localStorage.setItem("maxalena-library", JSON.stringify([...list]));
    } catch {
      /* ignore */
    }
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: book.title, url });
      else await navigator.clipboard.writeText(url);
      setShared(true);
    } catch {
      setShared(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <nav className="mb-3 text-sm text-pink-100/80" aria-label="Breadcrumb">
        <Link to="/" className="no-underline">
          Home
        </Link>
        <span> / </span>
        <Link to="/books" className="no-underline">
          Stories
        </Link>
        <span> / </span>
        <span className="text-[#ffe7a8]">{book.title}</span>
      </nav>

      <section className="glass-panel grid gap-6 p-4 md:grid-cols-[240px_1fr] md:p-6">
        <div className="overflow-hidden rounded-2xl border border-pink-300/40">
          {coverSrc(book) ? (
            <img src={coverSrc(book)!} alt={`Cover of ${book.title}`} className="aspect-[3/4] w-full object-cover" />
          ) : null}
        </div>
        <div>
          <h1 className="font-display text-5xl text-[#ffe7a8] md:text-6xl">{book.title}</h1>
          <p className="mt-1 text-sm tracking-[0.2em] text-pink-100/80 uppercase">Maxalena</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          {book.blurb && <p className="mt-4 text-lg italic text-[#ffe7a8]">{book.blurb}</p>}
          {synopsis[0] && <p className="mt-3 leading-7 text-pink-50/90">{synopsis[0]}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Link to="/books/$slug/preview" params={{ slug: book.slug }} className="gold-pill">
              Read sample
            </Link>
            <Link to="/books/$slug/preview" params={{ slug: book.slug }} className="ghost-pill">
              View chapters
            </Link>
            <button type="button" className="ghost-pill" onClick={toggleSaved}>
              {saved ? "Saved" : "Add to library"}
            </button>
            <button type="button" className="ghost-pill" onClick={() => void share()}>
              {shared ? "Link copied" : "Share"}
            </button>
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="glass-panel p-5 lg:col-span-1">
          <h2 className="font-display text-3xl text-[#ffe7a8]">Synopsis</h2>
          <div className="mt-3 space-y-3 text-sm leading-6 text-pink-50/90">
            {(synopsis.length ? synopsis : [book.blurb || ""]).map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </section>
        <section className="glass-panel p-5">
          <h2 className="font-display text-3xl text-[#ffe7a8]">Tropes</h2>
          <ul className="mt-3 space-y-2 text-sm text-pink-50/90">
            {(tropes.length ? tropes : tags).map((t) => (
              <li key={t}>♡ {t}</li>
            ))}
          </ul>
        </section>
        <section className="glass-panel p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-3xl text-[#ffe7a8]">Content notes</h2>
            {mature && <span className="chip">18+</span>}
          </div>
          <p className="mt-3 text-sm leading-6 text-pink-50/90">
            {warnings.length
              ? `This story contains mature themes, including ${warnings.join(", ")}.`
              : "Content notes will be listed here when they are added."}
          </p>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {relatedChars.length > 0 && (
          <section className="glass-panel p-5">
            <h2 className="font-display text-3xl text-[#ffe7a8]">Character spotlight</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedChars.slice(0, 2).map((c) => (
                <article key={c.id}>
                  <h3 className="font-display text-2xl">{characterDisplayName(c.name)}</h3>
                  <p className="text-xs uppercase tracking-widest text-[#ffe7a8]">{c.role || "Character"}</p>
                  <p className="mt-2 text-sm leading-6 text-pink-50/90">{characterPublicCopy(c.name, c.description).slice(0, 220)}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        <section className="glass-panel p-5">
          <h2 className="font-display text-3xl text-[#ffe7a8]">Excerpt preview</h2>
          <blockquote className="mt-3 text-sm italic leading-7 text-pink-50/90">“{excerpt.slice(0, 280)}{excerpt.length > 280 ? "…" : ""}”</blockquote>
          <Link to="/books/$slug/preview" params={{ slug: book.slug }} className="ghost-pill mt-4">
            Read sample
          </Link>
        </section>
      </div>

      {related.length > 0 && (
        <section className="glass-panel mt-4 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-3xl text-[#ffe7a8]">More stories you may like</h2>
            <Link to="/books" className="text-sm text-[#ffe7a8] no-underline">
              View all stories
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((b) => (
              <Link key={b.slug} to="/books/$slug" params={{ slug: b.slug }} className="flex gap-3 no-underline">
                {coverSrc(b) && <img src={coverSrc(b)!} alt="" className="h-24 w-16 rounded-lg object-cover" />}
                <span>
                  <span className="block font-display text-xl text-white">{b.title}</span>
                  <span className="mt-1 line-clamp-2 block text-sm text-pink-50/80">{b.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
