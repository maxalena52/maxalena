import type { MetadataRoute } from "next";
import { fetchBooks } from "@/lib/content";
import { siteUrl } from "@/lib/urls";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = siteUrl();
  const books = await fetchBooks().catch(() => []);
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/books`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${url}/characters`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/copyright`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  for (const book of books) {
    pages.push({
      url: `${url}/books/${book.slug}`,
      lastModified: book.updated_at ? new Date(book.updated_at) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  return pages;
}
