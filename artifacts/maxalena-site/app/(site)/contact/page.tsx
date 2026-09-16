import Link from "next/link";
import { authorCopy, fetchSettings } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact | Maxalena L.",
  description: "Public enquiries for Maxalena L. are currently closed.",
  robots: { index: false, follow: true },
};

export default async function ContactPage() {
  const settings = await fetchSettings().catch(() => ({}));
  const copy = authorCopy(settings);
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <p className="ornament mb-4">Correspondence</p>
      <h1 className="font-display text-5xl">Contact</h1>
      <p className="mt-6 text-lg text-[var(--parchment)]">{copy.contactMessage}</p>
      <p className="mt-3 text-[var(--taupe)]">{copy.contactSupport}</p>
      <Link href="/books" className="btn mt-10">
        Explore the Books
      </Link>
    </div>
  );
}
