import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="ornament mb-4">404</p>
        <h1 className="font-display text-5xl">This page is not in the library</h1>
        <p className="mt-4 text-[var(--taupe)]">The volume you asked for is missing, unpublished, or never existed.</p>
        <Link href="/books" className="btn mt-8">
          Explore the Books
        </Link>
      </main>
    </>
  );
}
