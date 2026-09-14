import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type { BookPreview } from "@/lib/preview";
import { statusLabel } from "@/lib/urls";

function guard(e: { preventDefault: () => void }) {
  e.preventDefault();
}

export function PreviewReader({ preview }: { preview: BookPreview }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const coming = statusLabel(preview.status) === "Coming Soon";

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const stop = (e: Event) => e.preventDefault();
    const keys = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (["c", "x", "a", "p", "s", "u"].includes(e.key.toLowerCase())) e.preventDefault();
    };
    const events = ["copy", "cut", "contextmenu", "dragstart", "selectstart"] as const;
    for (const name of events) el.addEventListener(name, stop);
    el.addEventListener("keydown", keys);
    return () => {
      for (const name of events) el.removeEventListener(name, stop);
      el.removeEventListener("keydown", keys);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="reader-protect mx-auto max-w-3xl px-4 py-8 sm:px-6"
      onCopy={guard}
      onCut={guard}
      onContextMenu={guard}
      onDragStart={guard}
    >
      <p className="font-ui mb-6 text-center text-xs uppercase tracking-[0.22em] text-gold">
        Sample · {preview.title}
      </p>

      {preview.chapters.length === 0 && (
        <section className="reader-page mb-8 px-6 py-16 text-center sm:px-12">
          <p className="ornament mb-4">The sample</p>
          <h1 className="font-display text-4xl text-charcoal">Preview coming soon.</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-taupe">
            The first two chapters will appear here once they have been set for this title.
          </p>
        </section>
      )}

      {preview.chapters.map((chapter) => (
        <article key={chapter.index} className="reader-page mb-8 px-6 py-10 sm:px-14 sm:py-14">
          <header className="mb-10 text-center">
            <p className="font-ui text-[0.7rem] uppercase tracking-[0.28em] text-oxblood">
              Chapter {chapter.index}
            </p>
            <h2 className="font-display mt-3 text-3xl text-charcoal sm:text-4xl">{chapter.title}</h2>
            <div className="gold-rule mx-auto mt-6 max-w-xs opacity-40" />
          </header>
          <div className="reader-body">
            {chapter.paragraphs.map((p, i) => (
              <p key={`${chapter.index}-${i}`}>{p}</p>
            ))}
          </div>
        </article>
      ))}

      <section className="reader-lock card-frame px-6 py-12 text-center sm:px-12">
        <p className="ornament mb-6">The story continues</p>
        {preview.coverUrl ? (
          <img
            src={preview.coverUrl}
            alt=""
            draggable={false}
            className="mx-auto mb-6 h-56 w-auto object-cover shadow-2xl"
          />
        ) : (
          <div className="font-display mx-auto mb-6 flex h-56 w-40 items-center justify-center bg-charcoal text-4xl text-gold">
            ML
          </div>
        )}
        <h2 className="font-display text-3xl text-ivory sm:text-4xl">{preview.title}</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-taupe">
          The sample ends here. Continue the rest of the book through the official edition.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {preview.amazonUrl && (
            <a className="btn" href={preview.amazonUrl} target="_blank" rel="noopener noreferrer">
              Buy on Amazon
            </a>
          )}
          {preview.patreonUrl && (
            <a className="btn" href={preview.patreonUrl} target="_blank" rel="noopener noreferrer">
              Continue on Patreon
            </a>
          )}
          {preview.readingUrl && (
            <a className="btn btn-ghost" href={preview.readingUrl} target="_blank" rel="noopener noreferrer">
              Read the rest
            </a>
          )}
          {coming && !preview.amazonUrl && !preview.patreonUrl && !preview.readingUrl && (
            <span className="badge badge-ox">Coming Soon</span>
          )}
          {!coming && !preview.amazonUrl && !preview.patreonUrl && !preview.readingUrl && (
            <Link to="/books/$slug" params={{ slug: preview.slug }} className="btn btn-ghost">
              Return to the book
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
