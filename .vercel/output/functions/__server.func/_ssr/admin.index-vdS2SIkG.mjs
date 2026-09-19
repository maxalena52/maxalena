import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getSupabase } from "./supabase-Cr5qzaz-.mjs";
import { t as isValidHttpUrl } from "./urls-BA2l0Qq9.mjs";
import { b as getBookPreviewForAdmin, x as saveBookPreview } from "./router-6E2B80Am.mjs";
import { t as listContactInbox } from "./contact-DsngQ_2_.mjs";
import { a as verifyAuthorSession, r as signOutDesk } from "./admin-auth-D618edk9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-vdS2SIkG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const navigate = useNavigate();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("books");
	const [books, setBooks] = (0, import_react.useState)([]);
	const [characters, setCharacters] = (0, import_react.useState)([]);
	const [settings, setSettings] = (0, import_react.useState)({});
	const [message, setMessage] = (0, import_react.useState)("");
	const [subsCount, setSubsCount] = (0, import_react.useState)(0);
	const [msgCount, setMsgCount] = (0, import_react.useState)(0);
	const [inbox, setInbox] = (0, import_react.useState)([]);
	const [previews, setPreviews] = (0, import_react.useState)({});
	const [token, setToken] = (0, import_react.useState)("");
	const [newTitle, setNewTitle] = (0, import_react.useState)("");
	const [newCharacterName, setNewCharacterName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		verifyAuthorSession().then(() => {
			setReady(true);
			load();
		}).catch(() => {
			navigate({ to: "/admin/login" });
		});
	}, [navigate]);
	async function load() {
		const sb = getSupabase();
		const [b, c, s, n, m] = await Promise.all([
			sb.from("books").select("*").order("order_index"),
			sb.from("characters").select("*").order("order_index"),
			sb.from("site_settings").select("key,value"),
			sb.from("newsletter_subscribers").select("id", {
				count: "exact",
				head: true
			}),
			sb.from("contact_messages").select("id", {
				count: "exact",
				head: true
			})
		]);
		setBooks(b.data || []);
		setCharacters(c.data || []);
		const map = {};
		(s.data || []).forEach((row) => {
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
		{
			const drafts = {};
			await Promise.all((b.data || []).map(async (book) => {
				try {
					const row = await getBookPreviewForAdmin({ data: {
						accessToken: "desk-session-placeholder-token",
						slug: book.slug
					} });
					drafts[book.slug] = {
						chapterOneTitle: row.chapter_one_title,
						chapterOneBody: row.chapter_one_body,
						chapterTwoTitle: row.chapter_two_title,
						chapterTwoBody: row.chapter_two_body
					};
				} catch {
					drafts[book.slug] = {
						chapterOneTitle: "Chapter One",
						chapterOneBody: "",
						chapterTwoTitle: "Chapter Two",
						chapterTwoBody: ""
					};
				}
			}));
			setPreviews(drafts);
		}
	}
	async function saveBook(book) {
		const sb = getSupabase();
		const links = (book.purchase_links || []).filter((l) => isValidHttpUrl(l.url));
		const { error } = await sb.from("books").update({
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
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", book.id);
		setMessage(error ? `Save failed: ${error.message}` : "Book saved.");
		if (!error) load();
	}
	async function saveCharacter(c) {
		const { error } = await getSupabase().from("characters").update({
			name: c.name,
			role: c.role,
			description: c.description,
			image_url: c.image_url,
			book_id: c.book_id
		}).eq("id", c.id);
		setMessage(error ? `Save failed: ${error.message}` : "Character saved.");
		if (!error) load();
	}
	async function saveSettings() {
		const sb = getSupabase();
		for (const [key, value] of Object.entries(settings)) await sb.from("site_settings").upsert({
			key,
			value,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		setMessage("Settings saved. Empty social URLs stay hidden on the public site.");
	}
	async function addBook() {
		const title = newTitle.trim();
		if (!title) {
			setMessage("Give the new book a title.");
			return;
		}
		const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
		const { error } = await getSupabase().from("books").insert({
			title,
			slug,
			status: "coming_soon",
			category: "coming_soon",
			order_index: (books.length + 1) * 10,
			tropes: [],
			trigger_warnings: [],
			purchase_links: []
		});
		setMessage(error ? `Could not add book: ${error.message}` : "Book added. Set the cover, sample chapters, and links.");
		if (!error) {
			setNewTitle("");
			load();
		}
	}
	async function addCharacter() {
		const name = newCharacterName.trim();
		if (!name) {
			setMessage("Give the character a name.");
			return;
		}
		const { error } = await getSupabase().from("characters").insert({
			name,
			role: "other",
			book_id: books[0]?.id || null,
			order_index: (characters.length + 1) * 10
		});
		setMessage(error ? `Could not add character: ${error.message}` : "Character added.");
		if (!error) {
			setNewCharacterName("");
			load();
		}
	}
	async function signOut() {
		await signOutDesk();
		await navigate({ to: "/admin/login" });
	}
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-10 text-taupe",
		children: "Checking session…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-5xl px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl",
					children: "Author desk"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-ghost",
					onClick: () => void signOut(),
					type: "button",
					children: "Sign out"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex flex-wrap gap-2",
				children: [
					"books",
					"characters",
					"settings",
					"messages"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: tab === t ? "btn min-h-9" : "btn btn-ghost min-h-9",
					onClick: () => setTab(t),
					type: "button",
					children: t
				}, t))
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-gold",
				children: message
			}),
			tab === "books" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-frame mb-6 flex flex-wrap items-end gap-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "min-w-56 flex-1 text-sm text-taupe",
					children: ["New book title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory",
						value: newTitle,
						onChange: (e) => setNewTitle(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn",
					type: "button",
					onClick: () => void addBook(),
					children: "Add book"
				})]
			}), books.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookEditor, {
				book,
				preview: previews[book.slug] || {
					chapterOneTitle: "Chapter One",
					chapterOneBody: "",
					chapterTwoTitle: "Chapter Two",
					chapterTwoBody: ""
				},
				onChange: (b) => setBooks((all) => all.map((x) => x.id === b.id ? b : x)),
				onPreviewChange: (draft) => setPreviews((all) => ({
					...all,
					[book.slug]: draft
				})),
				onSave: saveBook,
				onSavePreview: async (draft) => {
					if (!token) return;
					try {
						await saveBookPreview({ data: {
							accessToken: token,
							slug: book.slug,
							chapterOneTitle: draft.chapterOneTitle,
							chapterOneBody: draft.chapterOneBody,
							chapterTwoTitle: draft.chapterTwoTitle,
							chapterTwoBody: draft.chapterTwoBody
						} });
						setMessage("Sample chapters saved. Only these two chapters are sent to the public reader.");
					} catch (err) {
						setMessage(err instanceof Error ? err.message : "Preview save failed.");
					}
				}
			}, book.id))] }),
			tab === "characters" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-frame mb-6 flex flex-wrap items-end gap-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "min-w-56 flex-1 text-sm text-taupe",
					children: ["New character name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory",
						value: newCharacterName,
						onChange: (e) => setNewCharacterName(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn",
					type: "button",
					onClick: () => void addCharacter(),
					children: "Add character"
				})]
			}), characters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterEditor, {
				character: c,
				books,
				onChange: (n) => setCharacters((all) => all.map((x) => x.id === n.id ? n : x)),
				onSave: saveCharacter
			}, c.id))] }),
			tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-frame space-y-4 p-6",
				children: [
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
						["reviews_json", "Reviews JSON array"]
					].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm text-taupe",
						children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: settings[key] || "",
							onChange: (e) => setSettings((s) => ({
								...s,
								[key]: e.target.value
							})),
							className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory",
							rows: key.includes("bio") || key.includes("json") || key.includes("introduction") ? 4 : 2
						})]
					}, key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-taupe",
						children: "Social icons appear publicly only with a valid http(s) URL. Do not use #."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						type: "button",
						onClick: () => void saveSettings(),
						children: "Save settings"
					})
				]
			}),
			tab === "messages" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-taupe",
					children: [
						"New submissions appear here. Historical CMS rows retained: ",
						msgCount,
						". Newsletter capture remains off. Historical subscriber rows retained: ",
						subsCount,
						"."
					]
				}), inbox.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-frame p-6 text-parchment",
					children: "No messages in the desk inbox yet."
				}) : inbox.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card-frame space-y-2 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: row.subject || "No subject"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-taupe",
							children: [
								row.name,
								" · ",
								row.email,
								" · ",
								row.created_at
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap leading-7 text-parchment",
							children: row.message
						})
					]
				}, row.id))]
			})
		]
	});
}
function BookEditor({ book, preview, onChange, onPreviewChange, onSave, onSavePreview }) {
	const amazon = book.purchase_links?.find((l) => /amazon/i.test(l.platform))?.url || "";
	const goodreads = book.purchase_links?.find((l) => /goodreads/i.test(l.platform))?.url || "";
	function setLink(platform, url) {
		const rest = (book.purchase_links || []).filter((l) => l.platform.toLowerCase() !== platform.toLowerCase());
		onChange({
			...book,
			purchase_links: url.trim() ? [...rest, {
				platform,
				url: url.trim()
			}] : rest
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-frame mb-6 space-y-3 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: book.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				value: book.title,
				onChange: (v) => onChange({
					...book,
					title: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Slug",
				value: book.slug,
				onChange: (v) => onChange({
					...book,
					slug: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Status",
				value: book.status || "",
				onChange: (v) => onChange({
					...book,
					status: v,
					category: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cover URL",
				value: book.cover_url || "",
				onChange: (v) => onChange({
					...book,
					cover_url: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hook",
				value: book.blurb || "",
				onChange: (v) => onChange({
					...book,
					blurb: v
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Synopsis",
				value: book.synopsis || "",
				onChange: (v) => onChange({
					...book,
					synopsis: v
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tropes (comma)",
				value: (book.tropes || []).join(", "),
				onChange: (v) => onChange({
					...book,
					tropes: v.split(",").map((s) => s.trim()).filter(Boolean)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Content warnings (comma)",
				value: (book.trigger_warnings || []).join(", "),
				onChange: (v) => onChange({
					...book,
					trigger_warnings: v.split(",").map((s) => s.trim()).filter(Boolean)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Amazon URL",
				value: amazon === "#" ? "" : amazon,
				onChange: (v) => setLink("Amazon", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Goodreads URL",
				value: goodreads === "#" ? "" : goodreads,
				onChange: (v) => setLink("Goodreads", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-ui pt-4 text-xs uppercase tracking-widest text-gold",
				children: "Authorised sample — two chapters only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chapter one title",
				value: preview.chapterOneTitle,
				onChange: (v) => onPreviewChange({
					...preview,
					chapterOneTitle: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chapter one",
				value: preview.chapterOneBody,
				onChange: (v) => onPreviewChange({
					...preview,
					chapterOneBody: v
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chapter two title",
				value: preview.chapterTwoTitle,
				onChange: (v) => onPreviewChange({
					...preview,
					chapterTwoTitle: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chapter two",
				value: preview.chapterTwoBody,
				onChange: (v) => onPreviewChange({
					...preview,
					chapterTwoBody: v
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-taupe",
				children: "Anything past chapter two is never stored for the public reader."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn",
					type: "button",
					onClick: () => onSave(book),
					children: "Save book"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-ghost",
					type: "button",
					onClick: () => onSavePreview(preview),
					children: "Save sample chapters"
				})]
			})
		]
	});
}
function CharacterEditor({ character, books, onChange, onSave }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-frame mb-6 space-y-3 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: character.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				value: character.name,
				onChange: (v) => onChange({
					...character,
					name: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm text-taupe",
				children: ["Role", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory",
					value: character.role || "other",
					onChange: (e) => onChange({
						...character,
						role: e.target.value
					}),
					children: [
						"hero",
						"heroine",
						"villain",
						"antagonist",
						"supporting",
						"love_interest",
						"family",
						"other"
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: r,
						children: r
					}, r))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm text-taupe",
				children: ["Book", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory",
					value: character.book_id || "",
					onChange: (e) => onChange({
						...character,
						book_id: e.target.value
					}),
					children: books.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: b.id,
						children: b.title
					}, b.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Portrait URL",
				value: character.image_url || "",
				onChange: (v) => onChange({
					...character,
					image_url: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Public description",
				value: character.description || "",
				onChange: (v) => onChange({
					...character,
					description: v
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn",
				type: "button",
				onClick: () => onSave(character),
				children: "Save character"
			})
		]
	});
}
function Field({ label, value, onChange, area }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm text-taupe",
		children: [label, area ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory",
			rows: 5,
			value,
			onChange: (e) => onChange(e.target.value)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-ivory",
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
//#endregion
export { AdminPage as component };
