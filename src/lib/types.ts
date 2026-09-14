export type PurchaseLink = {
  platform: string;
  url: string;
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  cover_url: string | null;
  blurb: string | null;
  synopsis: string | null;
  tropes: string[] | null;
  trigger_warnings: string[] | null;
  status: string | null;
  category: string | null;
  order_index: number | null;
  purchase_links: PurchaseLink[] | null;
  sample_chapter: string | null;
  character_art_urls: string[] | null;
  created_at?: string;
  updated_at?: string;
};

export type Character = {
  id: string;
  book_id: string | null;
  name: string;
  role: string | null;
  description: string | null;
  image_url: string | null;
  order_index: number | null;
};

export type SiteSettings = Record<string, string>;

export type Review = {
  text: string;
  reviewer: string;
  source?: string;
  sourceUrl?: string;
  bookSlug?: string;
};
