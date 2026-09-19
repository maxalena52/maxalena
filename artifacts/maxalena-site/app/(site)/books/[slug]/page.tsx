import Link from "next/link";
import { notFound } from "next/navigation";
import WarningPanel from "@/components/WarningPanel";
import {
  amazonUrl,
  authorCopy,
  fetchBookBySlug,
  fetchBooks,
  fetchCharacters,
  fetchSettings,
  goodreadsUrl,
  inferGenre,
  readingUrl,
  tropesList,
  warningsList,
} from "@/lib/content";
import { characterDisplayName, characterPublicCopy, cleanText } from "@/lib/copy";
import { siteUrl, statusLabel } from "@/lib/urls";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const books = await fetchBooks();
    return books.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = await fetchBookBySlug(slug).catch(() => null);
  if (!book) return { title: "Book not found | Maxalena L." };
  const genre = inferGenre(book.title, book.tropes, book.status);
  return {
    title: `${book.title} by Maxalena L. | ${genre}`,
    description: book.blurb || book.synopsis?.slice(0, 150) || `${book.title} by Maxalena L.`,
    openGraph: {
      title: `${book.title} by Maxalena L.`,
      description: book.blurb || undefined,
      images: book.cover_url ? [book.cover_url] : ["/og-default.png"],
    },
    alternates: { canonical: `${siteUrl()}/books/${book.slug}` },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [book, characters, books, settings] = await Promise.all([
    fetchBookBySlug(slug),
    fetchCharacters(),
    fetchBooks(),
    fetchSettings(),
  ]).catch(() => [null, [], [], {}] as const);

  if (!book) notFound();

  const relatedChars = characters.filter((c) => c.book_id === book.id);
  const relatedBooks = books.filter((b) => b.id !== book.id).slice(0, 3);
  const warnings = warningsList(book);
  const mature = warnings.some((w) => /18\+|smut|explicit|mature/i.test(w));
  const amazon = amazonUrl(book);
  const goodreads = goodreadsUrl(book);
  const read = readingUrl(book, settings);
  const coming = statusLabel(book.status, book.category) === "Coming Soon";
  const synopsis = cleanText(book.synopsis).split(/\n\n+/);
  const art = (book.character_art_urls || []).filter(Boolean);
  const extras = authorCopy(settings);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <nav className="font-ui mb-8 text-xs uppercase tracking-[0.16em] text-[var(--taupe)]" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span> / </span>
        <Link href="/books">Books</Link>
        <span> / </span>
        <span className="text-[var(--parchment)]">{book.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        <div>
          <div className="aspect-[2/3] overflow-hidden bg-[#120f0d]">
            {book.cover_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={book.cover_url} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center font-display text-5xl text-[var(--gold)]">ML</div>
            )}
          </div>
        </div>
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className={coming ? "badge badge-ox" : "badge"}>{statusLabel(book.status, book.category)}</span>
            <span className="tag">{inferGenre(book.title, book.tropes, book.status)}</span>
          </div>
          <h1 className="font-display text-5xl leading-tight">{book.title}</h1>
          {book.blurb && <p className="mt-4 text-lg leading-8 text-[var(--taupe)]">{book.blurb}</p>}
          <div className="mt-5 flex flex-wrap gap-2">
            {tropesList(book).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {amazon && (
              <a className="btn" href={amazon} target="_blank" rel="noopener noreferrer">
                Buy on Amazon
              </a>
            )}
            {read && (
              <a className="btn" href={read} target="_blank" rel="noopener noreferrer">
                Read Now
              </a>
            )}
            {goodreads && (
              <a className="btn btn-ghost" href={goodreads} target="_blank" rel="noopener noreferrer">
                Goodreads
              </a>
            )}
            {coming && !amazon && !read && <span className="badge badge-ox">Coming Soon</span>}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <WarningPanel warnings={warnings} mature={mature} />
      </div>

      {synopsis.length > 0 && synopsis[0] && (
        <section className="prose-narrow mx-auto mt-14">
          <h2 className="font-display mb-4 text-3xl">Synopsis</h2>
          {synopsis.map((p, i) => (
            <p key={i} className="mb-4 leading-8 text-[var(--parchment)]">
              {p}
            </p>
          ))}
        </section>
      )}

      {relatedChars.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-3xl">Characters</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {relatedChars.map((c) => (
              <article key={c.id} className="card-frame flex gap-4 p-4">
                <div className="h-28 w-24 shrink-0 overflow-hidden bg-[#120f0d]">
                  {c.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.image_url} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div>
                  <p className="badge mb-2">{c.role || "Character"}</p>
                  <h3 className="font-display text-2xl">{characterDisplayName(c.name)}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--taupe)]">
                    {characterPublicCopy(c.name, c.description).slice(0, 220)}
                    {characterPublicCopy(c.name, c.description).length > 220 ? "…" : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/characters" className="btn btn-ghost mt-6">
            All characters
          </Link>
        </section>
      )}

      {art.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-3xl">Character art</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {art.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" className="w-full object-cover" />
            ))}
          </div>
        </section>
      )}

      {book.sample_chapter && book.sample_chapter.trim() && !/^https?:/i.test(book.sample_chapter) && (
        <section className="prose-narrow mx-auto mt-16">
          <h2 className="font-display mb-4 text-3xl">Excerpt</h2>
          <p className="whitespace-pre-wrap leading-8 text-[var(--parchment)]">{book.sample_chapter}</p>
        </section>
      )}

      {relatedBooks.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-3xl">Further into the library</h2>
          <ul className="space-y-2 text-[var(--parchment)]">
            {relatedBooks.map((b) => (
              <li key={b.id}>
                <Link href={`/books/${b.slug}`}>{b.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Book",
                name: book.title,
                author: { "@type": "Person", name: extras.name },
                description: book.blurb || undefined,
                image: book.cover_url || undefined,
                url: `${siteUrl()}/books/${book.slug}`,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
                  { "@type": "ListItem", position: 2, name: "Books", item: `${siteUrl()}/books` },
                  { "@type": "ListItem", position: 3, name: book.title, item: `${siteUrl()}/books/${book.slug}` },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  );
}
