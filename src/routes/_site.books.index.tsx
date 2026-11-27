import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookCard } from "@/components/book-card";
import { catalogBooks } from "@/lib/book-copy";
import { useLibrary } from "@/lib/use-library";
import { normaliseStatus } from "@/lib/urls";

export const Route = createFileRoute("/_site/books/")({
  head: () => ({
    meta: [
      { title: "Books by Maxalena L. | Dark Romance, Fantasy & Romantasy" },
      {
        name: "description",
        content: "Published books, ongoing serials, and coming-soon titles by Maxalena L.",
      },
    ],
  }),
  component: BooksPage,
});

const FILTERS = [
  { id: "all", label: "All Books" },
  { id: "published", label: "Published" },
  { id: "ongoing", label: "Ongoing Serials" },
  { id: "coming_soon", label: "Coming Soon" },
] as const;

function BooksPage() {
  const { books, settings, loading, error, refetch } = useLibrary();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("all");
  const [trope, setTrope] = useState("all");

  const tropes = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => (b.tropes || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [books]);

  const shelf = books.length ? books : catalogBooks();
  const visible = shelf.filter((book) => {
    const status = normaliseStatus(book.status, book.category);
    if (filter !== "all" && status !== filter) return false;
    if (q && !book.title.toLowerCase().includes(q.toLowerCase())) return false;
    if (trope !== "all" && !(book.tropes || []).includes(trope)) return false;
    if (genre !== "all") {
      const blob = `${book.title} ${(book.tropes || []).join(" ")}`.toLowerCase();
      if (!blob.includes(genre.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="read-panel mb-8 p-6 md:p-8">
      <p className="ornament mb-4 !justify-start">The Library</p>
      <h1 className="font-display text-5xl">Books</h1>
      <p className="mt-4 max-w-2xl text-taupe">
        Dark romance, romantasy, and forbidden contemporary stories—published, serialised, and forthcoming.
      </p>
      <div className="gold-rule my-8" />
      </div>

      {error ? (
        <div className="card-frame p-8">
          <p>The library failed to load.</p>
          <button type="button" className="btn mt-4" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="ink-panel mb-8 p-5 md:p-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <p className="text-sm text-taupe" aria-live="polite">
              {loading && !books.length ? "Loading titles…" : `${visible.length} ${visible.length === 1 ? "story" : "stories"}`}
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Publication status">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={filter === f.id ? "btn min-h-9 px-3" : "btn btn-ghost min-h-9 px-3"}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mb-10 grid gap-3 md:grid-cols-3">
            <label className="font-ui text-xs uppercase tracking-widest text-taupe">
              Search by title
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
                placeholder="Search titles"
              />
            </label>
            <label className="font-ui text-xs uppercase tracking-widest text-taupe">
              Genre
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
              >
                <option value="all">All genres</option>
                <option value="romance">Romance</option>
                <option value="fantasy">Fantasy</option>
                <option value="contemporary">Contemporary</option>
                <option value="supernatural">Supernatural</option>
              </select>
            </label>
            <label className="font-ui text-xs uppercase tracking-widest text-taupe">
              Trope
              <select
                value={trope}
                onChange={(e) => setTrope(e.target.value)}
                className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
              >
                <option value="all">All tropes</option>
                {tropes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>
          </div>

          {visible.length === 0 ? (
            <div className="card-frame p-10 text-center text-taupe">No titles match this search. Try another filter.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((book) => (
                <BookCard key={book.id} book={book} settings={settings} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
