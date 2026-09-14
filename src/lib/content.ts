import { getSupabase } from "./supabase";
import type { Book, Character, Review, SiteSettings } from "./types";
import { isValidHttpUrl, normaliseStatus } from "./urls";
import { DEFAULT_BIO, DEFAULT_INTRO, DEFAULT_POSITIONING } from "./copy";

export async function fetchBooks(): Promise<Book[]> {
  const { data, error } = await getSupabase()
    .from("books")
    .select(
      "id,title,slug,cover_url,blurb,synopsis,tropes,trigger_warnings,status,category,order_index,purchase_links,character_art_urls,created_at,updated_at",
    )
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []) as Book[];
}

export async function fetchCharacters(): Promise<Character[]> {
  const { data, error } = await getSupabase()
    .from("characters")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []) as Character[];
}

export async function fetchSettings(): Promise<SiteSettings> {
  const { data, error } = await getSupabase().from("site_settings").select("key,value");
  if (error || !data) return {};
  const map: SiteSettings = {};
  for (const row of data as { key: string; value: string }[]) {
    map[row.key] = row.value;
  }
  return map;
}

export function parseReviews(settings: SiteSettings): Review[] {
  const raw = settings.reviews_json;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((r) => r && typeof r === "object" && typeof (r as Review).text === "string" && (r as Review).text.trim()) as Review[];
  } catch {
    return [];
  }
}

export function visiblePurchaseLinks(book: Book) {
  return (book.purchase_links || []).filter((link) => isValidHttpUrl(link.url));
}

export function amazonUrl(book: Book) {
  const match = visiblePurchaseLinks(book).find(
    (l) => /amazon|kdp/i.test(l.platform || "") || /amazon\./i.test(l.url),
  );
  return match?.url || null;
}

export function goodreadsUrl(book: Book) {
  const match = visiblePurchaseLinks(book).find(
    (l) => /goodreads/i.test(l.platform || "") || /goodreads\./i.test(l.url),
  );
  return match?.url || null;
}

export function readingUrl(book: Book, settings: SiteSettings = {}) {
  const custom = settings[`reading_url_${book.slug}`];
  if (isValidHttpUrl(custom)) return custom;
  return null;
}

export function featuredBook(books: Book[], settings: SiteSettings) {
  const slug = settings.featured_book_slug;
  if (slug) {
    const found = books.find((b) => b.slug === slug);
    if (found) return found;
  }
  return books.find((b) => normaliseStatus(b.status, b.category) === "published") || books[0] || null;
}

export function socialLinks(settings: SiteSettings) {
  const keys = [
    ["instagram_url", "Instagram"],
    ["tiktok_url", "TikTok"],
    ["goodreads_url", "Goodreads"],
    ["patreon_url", "Patreon"],
    ["facebook_url", "Facebook"],
    ["x_url", "X"],
    ["twitter_url", "X"],
    ["youtube_url", "YouTube"],
  ] as const;
  const seen = new Set<string>();
  const links: { label: string; href: string }[] = [];
  for (const [key, label] of keys) {
    const href = settings[key];
    if (isValidHttpUrl(href) && !seen.has(label)) {
      seen.add(label);
      links.push({ label, href });
    }
  }
  return links;
}

export function authorCopy(settings: SiteSettings) {
  return {
    name: settings.author_display_name || "Maxalena L.",
    bio: settings.biography || DEFAULT_BIO,
    intro: settings.homepage_introduction || DEFAULT_INTRO,
    positioning: settings.footer_positioning || DEFAULT_POSITIONING,
    contactMessage: settings.contact_availability_message || "Public enquiries are currently closed.",
    contactSupport:
      settings.contact_supporting_message ||
      "Official contact and social links will appear here when they become available.",
    authorImage: isValidHttpUrl(settings.author_image_url) ? settings.author_image_url : null,
  };
}

export function warningsList(book: Book) {
  return (book.trigger_warnings || []).map((w) => w.trim()).filter(Boolean);
}

export function tropesList(book: Book, limit?: number) {
  const list = (book.tropes || []).map((t) => t.trim()).filter(Boolean);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function groupBooks(books: Book[]) {
  return {
    published: books.filter((b) => normaliseStatus(b.status, b.category) === "published"),
    ongoing: books.filter((b) => normaliseStatus(b.status, b.category) === "ongoing"),
    coming: books.filter((b) => normaliseStatus(b.status, b.category) === "coming_soon"),
  };
}
