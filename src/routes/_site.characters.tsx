import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { characterDisplayName, characterPublicCopy } from "@/lib/copy";
import { useLibrary } from "@/lib/use-library";
import type { Book, Character } from "@/lib/types";

export const Route = createFileRoute("/_site/characters")({
  head: () => ({
    meta: [
      { title: "Characters | The Worlds of Maxalena L." },
      {
        name: "description",
        content: "Heroes, heroines, and the figures who haunt the worlds of Maxalena L.",
      },
    ],
  }),
  component: CharactersPage,
});

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

function CharactersPage() {
  const { books, characters, loading, error, refetch } = useLibrary();
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
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="ornament mb-4 !justify-start">The Cast</p>
      <h1 className="font-display text-5xl">Characters</h1>
      <p className="mt-4 max-w-2xl text-taupe">Meet the heroes, heroines, and unforgettable figures who inhabit these worlds.</p>
      <div className="gold-rule my-8" />

      {error ? (
        <div className="card-frame p-8">
          <p>Characters failed to load.</p>
          <button type="button" className="btn mt-4" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8 grid gap-3 md:grid-cols-2">
            <label className="font-ui text-xs uppercase tracking-widest text-taupe">
              Filter by book
              <select
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
              >
                <option value="all">All books</option>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="font-ui text-xs uppercase tracking-widest text-taupe">
              Search by name
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
                placeholder="Character name"
              />
            </label>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2" aria-busy="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card-frame skeleton h-44" />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="card-frame p-10 text-center text-taupe">No characters match this search.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {visible.map((c) => (
                <CharacterCard key={c.id} character={c} book={c.book_id ? bookMap.get(c.book_id) : undefined} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CharacterCard({ character, book }: { character: Character; book?: Book }) {
  const desc = characterPublicCopy(character.name, character.description);
  return (
    <article className="card-frame overflow-hidden">
      <div className="grid grid-cols-[140px_1fr]">
        <div className="min-h-44 bg-charcoal">
          {character.image_url ? (
            <img
              src={character.image_url}
              alt={`Portrait of ${characterDisplayName(character.name)}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gold">ML</div>
          )}
        </div>
        <div className="p-5">
          <p className="badge mb-2">{roleLabel(character.role)}</p>
          <h2 className="font-display text-2xl">{characterDisplayName(character.name)}</h2>
          <p className="mt-3 text-sm leading-6 text-taupe">
            {desc.slice(0, 280)}
            {desc.length > 280 ? "…" : ""}
          </p>
          {book && (
            <Link to="/books/$slug" params={{ slug: book.slug }} className="mt-4 inline-block text-sm text-gold">
              {book.title}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
