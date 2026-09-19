"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase";
import type { Book, Character } from "@/lib/types";
import { isValidHttpUrl } from "@/lib/urls";

type Tab = "books" | "characters" | "settings" | "archive";

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("books");
  const [books, setBooks] = useState<Book[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [subsCount, setSubsCount] = useState(0);
  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    const sb = getBrowserSupabase();
    sb.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin/login");
      else {
        setReady(true);
        load();
      }
    });
  }, [router]);

  async function load() {
    const sb = getBrowserSupabase();
    const [b, c, s, n, m] = await Promise.all([
      sb.from("books").select("*").order("order_index"),
      sb.from("characters").select("*").order("order_index"),
      sb.from("site_settings").select("key,value"),
      sb.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
      sb.from("contact_messages").select("id", { count: "exact", head: true }),
    ]);
    setBooks((b.data || []) as Book[]);
    setCharacters((c.data || []) as Character[]);
    const map: Record<string, string> = {};
    (s.data || []).forEach((row: { key: string; value: string }) => {
      map[row.key] = row.value;
    });
    setSettings(map);
    setSubsCount(n.count || 0);
    setMsgCount(m.count || 0);
  }

  async function saveBook(book: Book) {
    const sb = getBrowserSupabase();
    const links = (book.purchase_links || []).filter((l) => isValidHttpUrl(l.url));
    const { error } = await sb
      .from("books")
      .update({
        title: book.title,
        slug: book.slug,
        blurb: book.blurb,
        synopsis: book.synopsis,
        tropes: book.tropes,
        trigger_warnings: book.trigger_warnings,
        status: book.status,
        category: book.category,
        cover_url: book.cover_url,
        purchase_links: links,
        sample_chapter: book.sample_chapter,
        updated_at: new Date().toISOString(),
      })
      .eq("id", book.id);
    setMessage(error ? `Save failed: ${error.message}` : "Book saved.");
    if (!error) load();
  }

  async function saveCharacter(c: Character) {
    const sb = getBrowserSupabase();
    const { error } = await sb
      .from("characters")
      .update({
        name: c.name,
        role: c.role,
        description: c.description,
        image_url: c.image_url,
        book_id: c.book_id,
      })
      .eq("id", c.id);
    setMessage(error ? `Save failed: ${error.message}` : "Character saved.");
    if (!error) load();
  }

  async function saveSettings() {
    const sb = getBrowserSupabase();
    const entries = Object.entries(settings);
    for (const [key, value] of entries) {
      await sb.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() });
    }
    setMessage("Settings saved. Empty social URLs stay hidden on the public site.");
  }

  async function signOut() {
    await getBrowserSupabase().auth.signOut();
    router.replace("/admin/login");
  }

  if (!ready) return <p className="p-10 text-[var(--taupe)]">Checking session…</p>;

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl">Author desk</h1>
        <button className="btn btn-ghost" onClick={signOut} type="button">
          Sign out
        </button>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(["books", "characters", "settings", "archive"] as Tab[]).map((t) => (
          <button key={t} className={tab === t ? "btn !min-h-9" : "btn btn-ghost !min-h-9"} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      {message && <p className="mb-4 text-sm text-[var(--gold)]">{message}</p>}

      {tab === "books" &&
        books.map((book) => (
          <BookEditor key={book.id} book={book} onChange={(b) => setBooks((all) => all.map((x) => (x.id === b.id ? b : x)))} onSave={saveBook} />
        ))}

      {tab === "characters" &&
        characters.map((c) => (
          <CharacterEditor
            key={c.id}
            character={c}
            books={books}
            onChange={(n) => setCharacters((all) => all.map((x) => (x.id === n.id ? n : x)))}
            onSave={saveCharacter}
          />
        ))}

      {tab === "settings" && (
        <div className="card-frame space-y-4 p-6">
          {[
            ["author_display_name", "Author display name"],
            ["homepage_introduction", "Homepage introduction"],
            ["biography", "Biography"],
            ["footer_positioning", "Footer line"],
            ["featured_book_slug", "Featured book slug"],
            ["author_image_url", "Author image URL"],
            ["contact_availability_message", "Contact page heading message"],
            ["contact_supporting_message", "Contact supporting text"],
            ["instagram_url", "Instagram URL"],
            ["tiktok_url", "TikTok URL"],
            ["goodreads_url", "Goodreads URL"],
            ["patreon_url", "Patreon URL"],
            ["facebook_url", "Facebook URL"],
            ["x_url", "X URL"],
            ["youtube_url", "YouTube URL"],
            ["legal_name", "Legal or business name"],
            ["legal_jurisdiction", "Governing country or jurisdiction"],
            ["legal_contact_method", "Formal legal contact method"],
            ["hosting_provider", "Hosting provider"],
            ["reviews_json", "Reviews JSON array"],
          ].map(([key, label]) => (
            <label key={key} className="block text-sm text-[var(--taupe)]">
              {label}
              <textarea
                value={settings[key] || ""}
                onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2 text-[var(--ivory)]"
                rows={key.includes("bio") || key.includes("json") || key.includes("introduction") ? 4 : 2}
              />
            </label>
          ))}
          <p className="text-xs text-[var(--taupe)]">
            Social icons appear on the public site only when the URL is a valid http(s) address. Do not use #.
          </p>
          <button className="btn" type="button" onClick={saveSettings}>
            Save settings
          </button>
        </div>
      )}

      {tab === "archive" && (
        <div className="card-frame space-y-3 p-6 text-[var(--parchment)]">
          <p>Public newsletter capture is disconnected. Historical subscriber rows retained: {subsCount}.</p>
          <p>Public contact form is disconnected. Historical message rows retained: {msgCount}.</p>
          <p>No subscriber or contact records are deleted by this rebuild.</p>
        </div>
      )}
    </main>
  );
}

function BookEditor({
  book,
  onChange,
  onSave,
}: {
  book: Book;
  onChange: (b: Book) => void;
  onSave: (b: Book) => void;
}) {
  const amazon = book.purchase_links?.find((l) => /amazon/i.test(l.platform))?.url || "";
  const goodreads = book.purchase_links?.find((l) => /goodreads/i.test(l.platform))?.url || "";
  function setLink(platform: string, url: string) {
    const rest = (book.purchase_links || []).filter((l) => l.platform.toLowerCase() !== platform.toLowerCase());
    onChange({ ...book, purchase_links: url.trim() ? [...rest, { platform, url: url.trim() }] : rest });
  }
  return (
    <section className="card-frame mb-6 space-y-3 p-5">
      <h2 className="font-display text-2xl">{book.title}</h2>
      <Field label="Title" value={book.title} onChange={(v) => onChange({ ...book, title: v })} />
      <Field label="Slug" value={book.slug} onChange={(v) => onChange({ ...book, slug: v })} />
      <Field label="Status" value={book.status || ""} onChange={(v) => onChange({ ...book, status: v, category: v })} />
      <Field label="Cover URL" value={book.cover_url || ""} onChange={(v) => onChange({ ...book, cover_url: v })} />
      <Field label="Hook" value={book.blurb || ""} onChange={(v) => onChange({ ...book, blurb: v })} area />
      <Field label="Synopsis" value={book.synopsis || ""} onChange={(v) => onChange({ ...book, synopsis: v })} area />
      <Field label="Tropes (comma)" value={(book.tropes || []).join(", ")} onChange={(v) => onChange({ ...book, tropes: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
      <Field label="Content warnings (comma)" value={(book.trigger_warnings || []).join(", ")} onChange={(v) => onChange({ ...book, trigger_warnings: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
      <Field label="Amazon URL" value={amazon === "#" ? "" : amazon} onChange={(v) => setLink("Amazon", v)} />
      <Field label="Goodreads URL" value={goodreads === "#" ? "" : goodreads} onChange={(v) => setLink("Goodreads", v)} />
      <button className="btn" type="button" onClick={() => onSave(book)}>
        Save book
      </button>
    </section>
  );
}

function CharacterEditor({
  character,
  books,
  onChange,
  onSave,
}: {
  character: Character;
  books: Book[];
  onChange: (c: Character) => void;
  onSave: (c: Character) => void;
}) {
  return (
    <section className="card-frame mb-6 space-y-3 p-5">
      <h2 className="font-display text-2xl">{character.name}</h2>
      <Field label="Name" value={character.name} onChange={(v) => onChange({ ...character, name: v })} />
      <label className="block text-sm text-[var(--taupe)]">
        Role
        <select
          className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2"
          value={character.role || "other"}
          onChange={(e) => onChange({ ...character, role: e.target.value })}
        >
          {["hero", "heroine", "villain", "antagonist", "supporting", "love_interest", "family", "other"].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-[var(--taupe)]">
        Book
        <select
          className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2"
          value={character.book_id || ""}
          onChange={(e) => onChange({ ...character, book_id: e.target.value })}
        >
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </label>
      <Field label="Portrait URL" value={character.image_url || ""} onChange={(v) => onChange({ ...character, image_url: v })} />
      <Field label="Public description" value={character.description || ""} onChange={(v) => onChange({ ...character, description: v })} area />
      <button className="btn" type="button" onClick={() => onSave(character)}>
        Save character
      </button>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  area,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <label className="block text-sm text-[var(--taupe)]">
      {label}
      {area ? (
        <textarea className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2 text-[var(--ivory)]" rows={5} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="mt-1 w-full border border-[rgba(198,161,91,0.25)] bg-[#120f0d] px-3 py-2 text-[var(--ivory)]" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
