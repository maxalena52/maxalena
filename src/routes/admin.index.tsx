import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listContactInbox } from "@/lib/contact";
import { signOutDesk, verifyAuthorSession } from "@/lib/admin-auth";
import { applyBookCopy } from "@/lib/book-copy";
import { getBookPreviewForAdmin, saveBookPreview } from "@/lib/preview";
import { getSupabase } from "@/lib/supabase";
import { isValidHttpUrl } from "@/lib/urls";
import type { Book, Character } from "@/lib/types";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Author desk" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Tab = "books" | "characters" | "settings" | "messages";

type PreviewDraft = {
  chapterOneTitle: string;
  chapterOneBody: string;
  chapterTwoTitle: string;
  chapterTwoBody: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("books");
  const [books, setBooks] = useState<Book[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [subsCount, setSubsCount] = useState(0);
  const [msgCount, setMsgCount] = useState(0);
  const [inbox, setInbox] = useState<
    { id: number; name: string; email: string; subject: string; message: string; created_at: string }[]
  >([]);
  const [previews, setPreviews] = useState<Record<string, PreviewDraft>>({});
  const [token, setToken] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCharacterName, setNewCharacterName] = useState("");

  useEffect(() => {
    void verifyAuthorSession()
      .then(() => {
        setReady(true);
        void load();
      })
      .catch(() => {
        void navigate({ to: "/admin/login" });
      });
  }, [navigate]);

  async function load() {
    const sb = getSupabase();
    const [b, c, s, n, m] = await Promise.all([
      sb.from("books").select("*").order("order_index"),
      sb.from("characters").select("*").order("order_index"),
      sb.from("site_settings").select("key,value"),
      sb.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
      sb.from("contact_messages").select("id", { count: "exact", head: true }),
    ]);
    setBooks(((b.data || []) as Book[]).map(applyBookCopy));
    setCharacters((c.data || []) as Character[]);
    const map: Record<string, string> = {};
    (s.data || []).forEach((row: { key: string; value: string }) => {
      map[row.key] = row.value;
    });
    setSettings(map);
    setSubsCount(n.count || 0);
    setMsgCount(m.count || 0);
    setToken("desk-session-placeholder-token");
    try {
      const rows = await listContactInbox({ data: { accessToken: "desk-session-placeholder-token" } });
      setInbox(rows);
    } catch {
      setInbox([]);
    }
    if (true) {
      const drafts: Record<string, PreviewDraft> = {};
      await Promise.all(
        ((b.data || []) as Book[]).map(async (book) => {
          try {
            const row = await getBookPreviewForAdmin({
              data: { accessToken: "desk-session-placeholder-token", slug: book.slug },
            });
            drafts[book.slug] = {
              chapterOneTitle: row.chapter_one_title,
              chapterOneBody: row.chapter_one_body,
              chapterTwoTitle: row.chapter_two_title,
              chapterTwoBody: row.chapter_two_body,
            };
          } catch {
            drafts[book.slug] = {
              chapterOneTitle: "Chapter One",
              chapterOneBody: "",
              chapterTwoTitle: "Chapter Two",
              chapterTwoBody: "",
            };
          }
        }),
      );
      setPreviews(drafts);
    }
  }

  async function saveBook(book: Book) {
    const sb = getSupabase();
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
    if (!error) void load();
  }

  async function saveCharacter(c: Character) {
    const { error } = await getSupabase()
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
    if (!error) void load();
  }

  async function saveSettings() {
    const sb = getSupabase();
    for (const [key, value] of Object.entries(settings)) {
      await sb.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() });
    }
    setMessage("Settings saved. Empty social URLs stay hidden on the public site.");
  }

  async function addBook() {
    const title = newTitle.trim();
    if (!title) {
      setMessage("Give the new book a title.");
      return;
    }
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const { error } = await getSupabase()
      .from("books")
      .insert({
        title,
        slug,
        status: "coming_soon",
        category: "coming_soon",
        order_index: (books.length + 1) * 10,
        tropes: [],
        trigger_warnings: [],
        purchase_links: [],
      });
    setMessage(error ? `Could not add book: ${error.message}` : "Book added. Set the cover, sample chapters, and links.");
    if (!error) {
      setNewTitle("");
      void load();
    }
  }

  async function addCharacter() {
    const name = newCharacterName.trim();
    if (!name) {
      setMessage("Give the character a name.");
      return;
    }
    const { error } = await getSupabase()
      .from("characters")
      .insert({
        name,
        role: "other",
        book_id: books[0]?.id || null,
        order_index: (characters.length + 1) * 10,
      });
    setMessage(error ? `Could not add character: ${error.message}` : "Character added.");
    if (!error) {
      setNewCharacterName("");
      void load();
    }
  }

  async function signOut() {
    await signOutDesk();
    await navigate({ to: "/admin/login" });
  }

  if (!ready) return <p className="p-10 text-taupe">Checking session…</p>;

  return (
    <main id="main" className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl">Author desk</h1>
        </div>
        <button className="btn btn-ghost" onClick={() => void signOut()} type="button">
          Sign out
        </button>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(["books", "characters", "settings", "messages"] as Tab[]).map((t) => (
          <button key={t} className={tab === t ? "btn min-h-9" : "btn btn-ghost min-h-9"} onClick={() => setTab(t)} type="button">
            {t}
          </button>
        ))}
      </div>
      {message && <p className="mb-4 text-sm text-gold">{message}</p>}

      {tab === "books" && (
        <div>
          <div className="card-frame mb-6 flex flex-wrap items-end gap-3 p-5">
            <label className="min-w-56 flex-1 text-sm text-taupe">
              New book title
              <input
                className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </label>
            <button className="btn" type="button" onClick={() => void addBook()}>
              Add book
            </button>
          </div>
          {books.map((book) => (
            <BookEditor
              key={book.id}
              book={book}
              preview={
                previews[book.slug] || {
                  chapterOneTitle: "Chapter One",
                  chapterOneBody: "",
                  chapterTwoTitle: "Chapter Two",
                  chapterTwoBody: "",
                }
              }
              onChange={(b) => setBooks((all) => all.map((x) => (x.id === b.id ? b : x)))}
              onPreviewChange={(draft) => setPreviews((all) => ({ ...all, [book.slug]: draft }))}
              onSave={saveBook}
              onSavePreview={async (draft) => {
                if (!token) return;
                try {
                  await saveBookPreview({
                    data: {
                      accessToken: token,
                      slug: book.slug,
                      chapterOneTitle: draft.chapterOneTitle,
                      chapterOneBody: draft.chapterOneBody,
                      chapterTwoTitle: draft.chapterTwoTitle,
                      chapterTwoBody: draft.chapterTwoBody,
                    },
                  });
                  setMessage("Sample chapters saved. Only these two chapters are sent to the public reader.");
                } catch (err) {
                  setMessage(err instanceof Error ? err.message : "Preview save failed.");
                }
              }}
            />
          ))}
        </div>
      )}

      {tab === "characters" && (
        <div>
          <div className="card-frame mb-6 flex flex-wrap items-end gap-3 p-5">
            <label className="min-w-56 flex-1 text-sm text-taupe">
              New character name
              <input
                className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory"
                value={newCharacterName}
                onChange={(e) => setNewCharacterName(e.target.value)}
              />
            </label>
            <button className="btn" type="button" onClick={() => void addCharacter()}>
              Add character
            </button>
          </div>
          {characters.map((c) => (
            <CharacterEditor
              key={c.id}
              character={c}
              books={books}
              onChange={(n) => setCharacters((all) => all.map((x) => (x.id === n.id ? n : x)))}
              onSave={saveCharacter}
            />
          ))}
        </div>
      )}

      {tab === "settings" && (
        <div className="card-frame space-y-4 p-6">
          {(
            [
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
              ["reviews_json", "Reviews JSON array"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm text-taupe">
              {label}
              <textarea
                value={settings[key] || ""}
                onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory"
                rows={key.includes("bio") || key.includes("json") || key.includes("introduction") ? 4 : 2}
              />
            </label>
          ))}
          <p className="text-xs text-taupe">Social icons appear publicly only with a valid http(s) URL. Do not use #.</p>
          <button className="btn" type="button" onClick={() => void saveSettings()}>
            Save settings
          </button>
        </div>
      )}

      {tab === "messages" && (
        <div className="space-y-4">
          <p className="text-sm text-taupe">
            New submissions appear here. Historical CMS rows retained: {msgCount}. Newsletter capture remains off.
            Historical subscriber rows retained: {subsCount}.
          </p>
          {inbox.length === 0 ? (
            <div className="card-frame p-6 text-parchment">No messages in the desk inbox yet.</div>
          ) : (
            inbox.map((row) => (
              <article key={row.id} className="card-frame space-y-2 p-5">
                <p className="font-display text-2xl">{row.subject || "No subject"}</p>
                <p className="text-sm text-taupe">
                  {row.name} · {row.email} · {row.created_at}
                </p>
                <p className="whitespace-pre-wrap leading-7 text-parchment">{row.message}</p>
              </article>
            ))
          )}
        </div>
      )}
    </main>
  );
}

function BookEditor({
  book,
  preview,
  onChange,
  onPreviewChange,
  onSave,
  onSavePreview,
}: {
  book: Book;
  preview: PreviewDraft;
  onChange: (b: Book) => void;
  onPreviewChange: (p: PreviewDraft) => void;
  onSave: (b: Book) => void;
  onSavePreview: (p: PreviewDraft) => void;
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
      <Field label="Cover file on GitHub" value={book.cover_url || ""} onChange={(v) => onChange({ ...book, cover_url: v })} />
      <label className="block text-sm text-taupe">
        Upload cover
        <input
          className="mt-1 block w-full text-ivory"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const dataBase64 = String(reader.result || "");
              void uploadBookCover({
                data: { slug: book.slug, filename: file.name, dataBase64 },
              })
                .then((res) => {
                  onChange({ ...book, cover_url: res.coverUrl });
                })
                .catch((err: unknown) => {
                  window.alert(err instanceof Error ? err.message : "Cover upload failed.");
                });
            };
            reader.readAsDataURL(file);
          }}
        />
      </label>
      {coverSrc(book) && (
        <img src={coverSrc(book)!} alt="" className="mt-2 h-40 w-auto object-cover" />
      )}
      <Field label="Hook" value={book.blurb || ""} onChange={(v) => onChange({ ...book, blurb: v })} area />
      <Field label="Synopsis" value={book.synopsis || ""} onChange={(v) => onChange({ ...book, synopsis: v })} area />
      <Field
        label="Tropes (comma)"
        value={(book.tropes || []).join(", ")}
        onChange={(v) => onChange({ ...book, tropes: v.split(",").map((s) => s.trim()).filter(Boolean) })}
      />
      <Field
        label="Content warnings (comma)"
        value={(book.trigger_warnings || []).join(", ")}
        onChange={(v) =>
          onChange({ ...book, trigger_warnings: v.split(",").map((s) => s.trim()).filter(Boolean) })
        }
      />
      <Field label="Amazon URL" value={amazon === "#" ? "" : amazon} onChange={(v) => setLink("Amazon", v)} />
      <Field label="Goodreads URL" value={goodreads === "#" ? "" : goodreads} onChange={(v) => setLink("Goodreads", v)} />
      <p className="font-ui pt-4 text-xs uppercase tracking-widest text-gold">Authorised sample — two chapters only</p>
      <Field
        label="Chapter one title"
        value={preview.chapterOneTitle}
        onChange={(v) => onPreviewChange({ ...preview, chapterOneTitle: v })}
      />
      <Field
        label="Chapter one"
        value={preview.chapterOneBody}
        onChange={(v) => onPreviewChange({ ...preview, chapterOneBody: v })}
        area
      />
      <Field
        label="Chapter two title"
        value={preview.chapterTwoTitle}
        onChange={(v) => onPreviewChange({ ...preview, chapterTwoTitle: v })}
      />
      <Field
        label="Chapter two"
        value={preview.chapterTwoBody}
        onChange={(v) => onPreviewChange({ ...preview, chapterTwoBody: v })}
        area
      />
      <p className="text-xs text-taupe">Anything past chapter two is never stored for the public reader.</p>
      <div className="flex flex-wrap gap-2">
        <button className="btn" type="button" onClick={() => onSave(book)}>
          Save book
        </button>
        <button className="btn btn-ghost" type="button" onClick={() => onSavePreview(preview)}>
          Save sample chapters
        </button>
      </div>
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
      <label className="block text-sm text-taupe">
        Role
        <select
          className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory"
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
      <label className="block text-sm text-taupe">
        Book
        <select
          className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory"
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
    <label className="block text-sm text-taupe">
      {label}
      {area ? (
        <textarea
          className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory"
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
