import { Link } from "@tanstack/react-router";
import type { Book, SiteSettings } from "@/lib/types";
import { amazonUrl, tropesList } from "@/lib/content";
import { coverSrc } from "@/lib/covers";
import { inferGenre } from "@/lib/copy";
import { statusLabel } from "@/lib/urls";

export function BookCard({ book }: { book: Book; settings?: SiteSettings }) {
  const status = statusLabel(book.status, book.category);
  const tropes = tropesList(book, 3);
  const amazon = amazonUrl(book);
  const coming = status === "Coming Soon";
  const genre = inferGenre(book.title, book.tropes, book.status);
  const cover = coverSrc(book);

  return (
    <article className="card-frame group flex h-full flex-col overflow-hidden">
      <Link to="/books/$slug" params={{ slug: book.slug }} className="block no-underline" aria-label={book.title}>
        <div className="relative aspect-cover overflow-hidden bg-charcoal">
          {cover ? (
            <img
              src={cover}
              alt={`Cover of ${book.title}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="font-display flex h-full items-center justify-center text-4xl text-gold">ML</div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={coming ? "badge badge-ox" : "badge"}>{status}</span>
          <span className="tag">{genre}</span>
        </div>
        <h3 className="font-display text-2xl leading-tight text-ivory">
          <Link to="/books/$slug" params={{ slug: book.slug }}>
            {book.title}
          </Link>
        </h3>
        {book.blurb && <p className="text-sm leading-6 text-taupe">{book.blurb}</p>}
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
          <Link to="/books/$slug" params={{ slug: book.slug }} className="btn min-h-9 px-3 text-xs tracking-widest">
            View Book
          </Link>
          <Link to="/books/$slug/preview" params={{ slug: book.slug }} className="btn btn-ghost min-h-9 px-3 text-xs tracking-widest">
            Read sample
          </Link>
          {amazon && (
            <a href={amazon} className="btn btn-ghost min-h-9 px-3 text-xs tracking-widest" target="_blank" rel="noopener noreferrer">
              Buy on Amazon
            </a>
          )}
          {coming && !amazon && <span className="badge badge-ox">Coming Soon</span>}
        </div>
      </div>
    </article>
  );
}
