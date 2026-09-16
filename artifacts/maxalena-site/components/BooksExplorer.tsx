"use client";

import { useMemo, useState } from "react";
import BookCard from "./BookCard";
import type { Book, SiteSettings } from "@/lib/types";
import { normaliseStatus } from "@/lib/urls";

const FILTERS = [
  { id: "all", label: "All Books" },
  { id: "published", label: "Published" },
  { id: "ongoing", label: "Ongoing Serials" },
  { id: "coming_soon", label: "Coming Soon" },
];

export default function BooksExplorer({
  books,
  settings,
  initialFilter = "all",
}: {
  books: Book[];
  settings: SiteSettings;
  initialFilter?: string;
}) {
  const [filter, setFilter] = useState(
    FILTERS.some((f) => f.id === initialFilter) ? initialFilter : "all"
  );
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("all");
  const [trope, setTrope] = useState("all");

  const tropes = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => (b.tropes || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [books]);

  const visible = books.filter((book) => {
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
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <p className="text-sm text-[var(--taupe)]" aria-live="polite">
          {visible.length} {visible.length === 1 ? "book" : "books"}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Publication status">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={filter === f.id ? "btn !min-h-9 !px-3" : "btn btn-ghost !min-h-9 !px-3"}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mb-10 grid gap-3 md:grid-cols-3">
        <label className="font-ui text-xs uppercase tracking-[0.16em] text-[var(--taupe)]">
          Search by title
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2 text-sm text-[var(--ivory)]"
            placeholder="Search titles"
          />
        </label>
        <label className="font-ui text-xs uppercase tracking-[0.16em] text-[var(--taupe)]">
          Genre
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2 text-sm text-[var(--ivory)]"
          >
            <option value="all">All genres</option>
            <option value="romance">Romance</option>
            <option value="fantasy">Fantasy</option>
            <option value="contemporary">Contemporary</option>
            <option value="supernatural">Supernatural</option>
          </select>
        </label>
        <label className="font-ui text-xs uppercase tracking-[0.16em] text-[var(--taupe)]">
          Trope
          <select
            value={trope}
            onChange={(e) => setTrope(e.target.value)}
            className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2 text-sm text-[var(--ivory)]"
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

      {visible.length === 0 ? (
        <div className="card-frame p-10 text-center text-[var(--taupe)]">
          No titles match this search. Try another filter.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((book) => (
            <BookCard key={book.id} book={book} settings={settings} />
          ))}
        </div>
      )}
    </div>
  );
}
