import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { shelfBooks } from "@/lib/book-copy";
import { coverSrc } from "@/lib/covers";
import { useLibrary } from "@/lib/use-library";
import type { Book } from "@/lib/types";

export const Route = createFileRoute("/_site/books/")({
  head: () => ({
    meta: [
      { title: "Stories | Maxalena" },
      { name: "description", content: "Browse Maxalena's worlds of desire, danger, obsession, and dark romance." },
    ],
  }),
  component: BooksPage,
});

const FILTERS = ["All", "Dark Romance", "Fantasy", "Paranormal", "Ongoing", "Completed"] as const;

const TAGS: Record<string, string[]> = {
  "blood-covenant": ["Dark Romance", "Fantasy", "Completed"],
  "office-hours": ["Dark Romance", "Completed"],
  "ceo-s-hostile-take-over": ["Dark Romance", "Completed"],
  "grim-reaper-chaos": ["Fantasy", "Paranormal", "Completed"],
  "the-dragon-commanders-captive": ["Fantasy", "Dark Romance", "Completed"],
  "the-emperors-black-widow": ["Dark Romance", "Fantasy", "Completed"],
  "the-algorithm-of-vengeance": ["Dark Romance", "Completed"],
};

function tagsFor(book: Book) {
  return TAGS[book.slug] || ["Dark Romance"];
}

function BooksPage() {
  const { books } = useLibrary();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shelf = useMemo(() => shelfBooks(books), [books]);
  const visible = shelf.filter((book) => filter === "All" || tagsFor(book).includes(filter));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <header className="mb-6 text-center">
        <h1 className="page-title text-7xl md:text-8xl">Stories</h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm italic text-pink-50/90 md:text-base">
          Browse Maxalena's worlds of desire, danger, obsession, and dark romance.
        </p>
      </header>
      <div className="mb-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Story filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={filter === f ? "gold-pill" : "ghost-pill"}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((book) => {
          const cover = coverSrc(book);
          const labels = tagsFor(book).filter((t) => t !== "Completed" && t !== "Ongoing").slice(0, 2);
          return (
            <article key={book.slug} className="glass-panel flex flex-col overflow-hidden p-3">
              <Link to="/books/$slug" params={{ slug: book.slug }} className="block overflow-hidden rounded-xl">
                {cover ? (
                  <img src={cover} alt={`Cover of ${book.title}`} className="aspect-[3/4] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-[#1a0630] text-gold">Cover</div>
                )}
              </Link>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="chip">Published</span>
                {labels.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="mt-2 font-display text-2xl text-white">
                <Link to="/books/$slug" params={{ slug: book.slug }} className="no-underline">
                  {book.title}
                </Link>
              </h2>
              {book.blurb && <p className="mt-1 line-clamp-4 text-sm leading-6 text-pink-50/85">{book.blurb}</p>}
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                <Link to="/books/$slug" params={{ slug: book.slug }} className="gold-pill text-xs">
                  View Book
                </Link>
                <Link to="/books/$slug/preview" params={{ slug: book.slug }} className="ghost-pill text-xs">
                  Read Sample
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
