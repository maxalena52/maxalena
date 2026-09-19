import CharactersExplorer from "@/components/CharactersExplorer";
import { fetchBooks, fetchCharacters } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Characters | The Worlds of Maxalena L.",
  description: "Heroes, heroines, and the figures who haunt the worlds of Maxalena L.",
};

export default async function CharactersPage() {
  let characters = [];
  let books = [];
  let error = "";
  try {
    [characters, books] = await Promise.all([fetchCharacters(), fetchBooks()]);
  } catch {
    error = "Characters failed to load.";
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="ornament !justify-start mb-4">The Cast</p>
      <h1 className="font-display text-5xl">Characters</h1>
      <p className="mt-4 max-w-2xl text-[var(--taupe)]">
        Meet the heroes, heroines, and unforgettable figures who inhabit these worlds.
      </p>
      <div className="gold-rule my-8" />
      {error ? (
        <div className="card-frame p-8">
          <p>{error}</p>
          <a href="/characters" className="btn mt-4">Retry</a>
        </div>
      ) : (
        <CharactersExplorer characters={characters} books={books} />
      )}
    </div>
  );
}
