"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-display text-4xl">Something in the stacks has slipped</h1>
      <p className="mt-4 text-[var(--taupe)]">The page could not be rendered. Try again.</p>
      <button className="btn mt-8" type="button" onClick={() => reset()}>
        Retry
      </button>
    </main>
  );
}
