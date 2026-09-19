"use client";

import { useState } from "react";

export default function WarningPanel({
  warnings,
  mature,
}: {
  warnings: string[];
  mature?: boolean;
}) {
  const [open, setOpen] = useState(false);
  if (!warnings.length && !mature) return null;

  return (
    <section className="card-frame p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-ui text-xs uppercase tracking-[0.18em] text-[var(--gold)]">Content notes</p>
          {mature && <p className="badge badge-ox mt-2">18+ / Explicit content</p>}
        </div>
        {warnings.length > 0 && (
          <button
            type="button"
            className="btn btn-ghost !min-h-9"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide content warnings" : "Reveal content warnings"}
          </button>
        )}
      </div>
      {open && warnings.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--parchment)]">
          {warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
