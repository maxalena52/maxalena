import Link from "next/link";
import type { Book } from "@/lib/types";
import { inferGenre, tropesList } from "@/lib/content";
import { amazonUrl, readingUrl } from "@/lib/content";
import type { SiteSettings } from "@/lib/types";
import { statusLabel } from "@/lib/urls";

export default function BookCard({
  book,
  settings = {},
}: {
  book: Book;
  settings?: SiteSettings;
}) {
  const status = statusLabel(book.status, book.category);
  const tropes = tropesList(book, 3);
  const amazon = amazonUrl(book);
  const read = readingUrl(book, settings);
  const coming = status === "Coming Soon";

  return (
    <article className="card-frame group flex h-full flex-col overflow-hidden">
      <Link href={`/books/${book.slug}`} className="block no-underline" aria-label={book.title}>
        <div className="relative aspect-[2/3] overflow-hidden bg-[#120f0d]">
          {book.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.cover_url}
              alt={`Cover of ${book.title}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-4xl text-[var(--gold)]">ML</div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={coming ? "badge badge-ox" : "badge"}>{status}</span>
          <span className="tag">{inferGenre(book.title, book.tropes, book.status)}</span>
        </div>
        <h3 className="font-display text-2xl leading-tight text-[var(--ivory)]">
          <Link href={`/books/${book.slug}`}>{book.title}</Link>
        </h3>
        {book.blurb && (
          <p className="text-sm leading-6 text-[var(--taupe)]">{book.blurb}</p>
        )}
        {tropes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tropes.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link href={`/books/${book.slug}`} className="btn !min-h-9 !px-3 !text-[0.65rem]">
            View Book
          </Link>
          {read && (
            <a href={read} className="btn-ghost btn !min-h-9 !px-3 !text-[0.65rem]" target="_blank" rel="noopener noreferrer">
              Read Now
            </a>
          )}
          {amazon && (
            <a href={amazon} className="btn-ghost btn !min-h-9 !px-3 !text-[0.65rem]" target="_blank" rel="noopener noreferrer">
              Buy on Amazon
            </a>
          )}
          {coming && !amazon && !read && (
            <span className="badge badge-ox">Coming Soon</span>
          )}
        </div>
      </div>
    </article>
  );
}
