import { i as __toESM } from "../_runtime.mjs";
import { t as getSupabase } from "./supabase-CFMh116S.mjs";
import { t as isValidHttpUrl } from "./urls-BA2l0Qq9.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-bMvbnKfP.js
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
	(0, import_react.useEffect)(() => {
		getSupabase().auth.getSession().then(({ data }) => {
			if (!data.session) navigate({ to: "/admin/login" });
			else {
				setReady(true);
				load();
			}
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
	async function signOut() {
		await getSupabase().auth.signOut();
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl",
					children: "Author desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
					"archive"
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
			tab === "books" && books.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookEditor, {
				book,
				onChange: (b) => setBooks((all) => all.map((x) => x.id === b.id ? b : x)),
				onSave: saveBook
			}, book.id)),
			tab === "characters" && characters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterEditor, {
				character: c,
				books,
				onChange: (n) => setCharacters((all) => all.map((x) => x.id === n.id ? n : x)),
				onSave: saveCharacter
			}, c.id)),
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
			tab === "archive" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-frame space-y-3 p-6 text-parchment",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Public newsletter capture is disconnected. Historical subscriber rows retained: ",
						subsCount,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Public contact form is disconnected. Historical message rows retained: ",
						msgCount,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No subscriber or contact records are deleted by this rebuild." })
				]
			})
		]
	});
}
function BookEditor({ book, onChange, onSave }) {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn",
				type: "button",
				onClick: () => onSave(book),
				children: "Save book"
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
