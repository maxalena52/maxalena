import { getSupabase, isSupabaseConfigured } from "./supabase";
import type { Book, Character, Review, SiteSettings } from "./types";
import { isValidHttpUrl, normaliseStatus } from "./urls";
import { DEFAULT_BIO, DEFAULT_INTRO, DEFAULT_POSITIONING } from "./copy";

export async function fetchBooks(): Promise<Book[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await getSupabase()
    .from("books")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []) as Book[];
}

export async function fetchBookBySlug(slug: string): Promise<Book | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await getSupabase()
    .from("books")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Book) || null;
}

export async function fetchCharacters(): Promise<Character[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await getSupabase()
    .from("characters")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []) as Character[];
}

export async function fetchSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return {};
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
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((r) => r && typeof r.text === "string" && r.text.trim());
  } catch {
    return [];
  }
}

export function visiblePurchaseLinks(book: Book) {
  return (book.purchase_links || []).filter((link) => isValidHttpUrl(link.url));
}

export function amazonUrl(book: Book) {
  const match = visiblePurchaseLinks(book).find((l) =>
    /amazon|kdp/i.test(l.platform || "") || /amazon\./i.test(l.url)
  );
  return match?.url || null;
}

export function goodreadsUrl(book: Book) {
  const match = visiblePurchaseLinks(book).find((l) =>
    /goodreads/i.test(l.platform || "") || /goodreads\./i.test(l.url)
  );
  return match?.url || null;
}

export function readingUrl(book: Book, settings: SiteSettings = {}) {
  const custom = settings[`reading_url_${book.slug}`];
  if (isValidHttpUrl(custom)) return custom;
  if (isValidHttpUrl(book.sample_chapter) && /^https?:/i.test(book.sample_chapter || "")) {
    return book.sample_chapter as string;
  }
  return null;
}

export function featuredBook(books: Book[], settings: SiteSettings) {
  const slug = settings.featured_book_slug;
  if (slug) {
    const found = books.find((b) => b.slug === slug);
    if (found) return found;
  }
  return (
    books.find((b) => normaliseStatus(b.status, b.category) === "published") ||
    books[0] ||
    null
  );
}

export function socialLinks(settings: SiteSettings) {
  const keys = [
    ["instagram", "Instagram"],
    ["tiktok", "TikTok"],
    ["goodreads", "Goodreads"],
    ["patreon", "Patreon"],
    ["facebook", "Facebook"],
    ["x", "X"],
    ["twitter", "X"],
    ["youtube", "YouTube"],
  ] as const;
  const seen = new Set<string>();
  const links: { label: string; href: string }[] = [];
  for (const [key, label] of keys) {
    const href = settings[`${key}_url`] || settings[key];
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
    contactMessage:
      settings.contact_availability_message ||
      "Public enquiries are currently closed.",
    contactSupport:
      settings.contact_supporting_message ||
      "Official contact and social links will appear here when they become available.",
    authorImage: isValidHttpUrl(settings.author_image_url)
      ? settings.author_image_url
      : null,
  };
}

export function warningsList(book: Book) {
  return (book.trigger_warnings || []).map((w) => w.trim()).filter(Boolean);
}

export function tropesList(book: Book, limit?: number) {
  const list = (book.tropes || []).map((t) => t.trim()).filter(Boolean);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
