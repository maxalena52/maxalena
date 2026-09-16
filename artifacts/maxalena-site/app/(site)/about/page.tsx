import Link from "next/link";
import { authorCopy, fetchBooks, fetchSettings, socialLinks } from "@/lib/content";
import { siteUrl } from "@/lib/urls";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Maxalena L. | Dark Romance & Fantasy Author",
  description:
    "Biography of Maxalena L., author of dark romance, romantasy, gothic fiction, and forbidden contemporary stories.",
};

export default async function AboutPage() {
  const [settings, books] = await Promise.all([fetchSettings(), fetchBooks()]).catch(
    () => [{} as Record<string, string>, []] as const
  );
  const copy = authorCopy(settings);
  const socials = socialLinks(settings);
  const facts = [
    "Writes best between midnight and 3am.",
    "Keeps a playlist for every book—and every character.",
    "Treats the villain’s arc as seriously as the hero’s.",
    "Will defend enemies-to-lovers as a superior trope in any debate.",
    "Her characters argue with her constantly. She lets them win sometimes.",
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="ornament !justify-start mb-4">The Author</p>
      <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(198,161,91,0.3)] bg-[#120f0d]">
        {copy.authorImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={copy.authorImage} alt="Portrait of Maxalena L." className="h-full w-full rounded-full object-cover" />
        ) : (
          <span className="font-display text-4xl text-[var(--gold)]">ML</span>
        )}
      </div>
      <h1 className="font-display text-5xl">Maxalena L.</h1>
      <p className="mt-2 text-[var(--gold)]">Dark Romance, Romantasy & Fantasy Author</p>
      <div className="gold-rule my-8" />
      <p className="leading-8 text-[var(--parchment)]">{copy.bio}</p>
      <h2 className="font-display mt-12 text-3xl">Themes</h2>
      <p className="mt-3 leading-8 text-[var(--taupe)]">
        Forbidden love. Soul-bonds and broken oaths. Hunters and the hunted. Slow-burn obsession.
        Worlds that blur the line between light and shadow.
      </p>
      {books.length > 0 && (
        <>
          <h2 className="font-display mt-12 text-3xl">Selected works</h2>
          <ul className="mt-4 space-y-2">
            {books.map((b) => (
              <li key={b.id}>
                <Link href={`/books/${b.slug}`}>{b.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <h2 className="font-display mt-12 text-3xl">Notes from the desk</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--taupe)]">
        {facts.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {socials.length > 0 && (
        <>
          <h2 className="font-display mt-12 text-3xl">Find Maxalena L. online</h2>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-10 flex gap-3">
        <Link href="/books" className="btn">Books</Link>
        <Link href="/characters" className="btn btn-ghost">Characters</Link>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Maxalena L.",
            url: `${siteUrl()}/about`,
            jobTitle: "Author",
            description: copy.bio,
          }),
        }}
      />
    </div>
  );
}
