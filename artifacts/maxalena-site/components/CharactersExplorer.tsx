"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Book, Character } from "@/lib/types";
import { characterDisplayName, characterPublicCopy } from "@/lib/copy";

function roleLabel(role?: string | null) {
  const r = (role || "other").toLowerCase();
  if (r === "hero") return "Hero";
  if (r === "heroine") return "Heroine";
  if (r === "villain") return "Villain";
  if (r === "antagonist") return "Antagonist";
  if (r.includes("love")) return "Love Interest";
  if (r.includes("support")) return "Supporting Character";
  if (r.includes("family")) return "Family";
  return "Other";
}

export default function CharactersExplorer({
  characters,
  books,
}: {
  characters: Character[];
  books: Book[];
}) {
  const [bookId, setBookId] = useState("all");
  const [q, setQ] = useState("");

  const bookMap = useMemo(() => {
    const m = new Map<string, Book>();
    books.forEach((b) => m.set(b.id, b));
    return m;
  }, [books]);

  const visible = characters.filter((c) => {
    if (bookId !== "all" && c.book_id !== bookId) return false;
    if (q && !characterDisplayName(c.name).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-8 grid gap-3 md:grid-cols-2">
        <label className="font-ui text-xs uppercase tracking-[0.16em] text-[var(--taupe)]">
          Filter by book
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2 text-sm"
          >
            <option value="all">All books</option>
            {books.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>
        </label>
        <label className="font-ui text-xs uppercase tracking-[0.16em] text-[var(--taupe)]">
          Search by name
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2 text-sm"
            placeholder="Character name"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <div className="card-frame p-10 text-center text-[var(--taupe)]">
          No characters match this search.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {visible.map((c) => {
            const book = c.book_id ? bookMap.get(c.book_id) : undefined;
            const desc = characterPublicCopy(c.name, c.description);
            return (
              <article key={c.id} className="card-frame overflow-hidden">
                <div className="grid grid-cols-[140px_1fr]">
                  <div className="min-h-[180px] bg-[#120f0d]">
                    {c.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={c.image_url}
                        alt={`Portrait of ${characterDisplayName(c.name)}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[var(--gold)]">ML</div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="badge mb-2">{roleLabel(c.role)}</p>
                    <h2 className="font-display text-2xl">{characterDisplayName(c.name)}</h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--taupe)]">
                      {desc.slice(0, 280)}
                      {desc.length > 280 ? "…" : ""}
                    </p>
                    {book && (
                      <Link href={`/books/${book.slug}`} className="mt-4 inline-block text-sm text-[var(--gold)]">
                        {book.title}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
