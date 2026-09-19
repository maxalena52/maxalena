import BooksExplorer from "@/components/BooksExplorer";
import { fetchBooks, fetchSettings } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Books by Maxalena L. | Dark Romance, Fantasy & Romantasy",
  description: "Published books, ongoing serials, and coming-soon titles by Maxalena L.",
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  let books = [];
  let settings = {};
  let error = "";
  try {
    [books, settings] = await Promise.all([fetchBooks(), fetchSettings()]);
  } catch {
    error = "The library failed to load.";
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="ornament !justify-start mb-4">The Library</p>
      <h1 className="font-display text-5xl">Books</h1>
      <p className="mt-4 max-w-2xl text-[var(--taupe)]">
        Dark romance, romantasy, and forbidden contemporary stories—published, serialised, and forthcoming.
      </p>
      <div className="gold-rule my-8" />
      {error ? (
        <div className="card-frame p-8">
          <p>{error}</p>
          <a href="/books" className="btn mt-4">Retry</a>
        </div>
      ) : (
        <BooksExplorer books={books} settings={settings} initialFilter={filter || "all"} />
      )}
    </div>
  );
}
