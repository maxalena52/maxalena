import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useLibrary, g as characterPublicCopy, h as characterDisplayName } from "./_ssr/router-BNnudyjE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.characters-CMPxI1fI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function roleLabel(role) {
	const r = (role || "other").toLowerCase();
	if (r === "hero") return "Hero";
	if (r === "heroine") return "Heroine";
	if (r === "villain") return "Villain";
	if (r === "antagonist") return "Antagonist";
	if (r.includes("love")) return "Love Interest";
	if (r.includes("support")) return "Supporting Character";
	if (r.includes("family")) return "Family";
	return "Other";
}
function CharactersPage() {
	const { books, characters, loading, error, refetch } = useLibrary();
	const [bookId, setBookId] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const bookMap = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		books.forEach((b) => m.set(b.id, b));
		return m;
	}, [books]);
	const visible = characters.filter((c) => {
		if (bookId !== "all" && c.book_id !== bookId) return false;
		if (q && !characterDisplayName(c.name).toLowerCase().includes(q.toLowerCase())) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-4 !justify-start",
				children: "The Cast"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl",
				children: "Characters"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-taupe",
				children: "Meet the heroes, heroines, and unforgettable figures who inhabit these worlds."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-8" }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-frame p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Characters failed to load." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn mt-4",
					onClick: () => refetch(),
					children: "Retry"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "font-ui text-xs uppercase tracking-widest text-taupe",
					children: ["Filter by book", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: bookId,
						onChange: (e) => setBookId(e.target.value),
						className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All books"
						}), books.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: b.id,
							children: b.title
						}, b.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "font-ui text-xs uppercase tracking-widest text-taupe",
					children: ["Search by name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory",
						placeholder: "Character name"
					})]
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2",
				"aria-busy": "true",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card-frame skeleton h-44" }, i))
			}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-frame p-10 text-center text-taupe",
				children: "No characters match this search."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2",
				children: visible.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterCard, {
					character: c,
					book: c.book_id ? bookMap.get(c.book_id) : void 0
				}, c.id))
			})] })
		]
	});
}
function CharacterCard({ character, book }) {
	const desc = characterPublicCopy(character.name, character.description);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "card-frame overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[140px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-44 bg-charcoal",
				children: character.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: character.image_url,
					alt: `Portrait of ${characterDisplayName(character.name)}`,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-gold",
					children: "ML"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "badge mb-2",
						children: roleLabel(character.role)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: characterDisplayName(character.name)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm leading-6 text-taupe",
						children: [desc.slice(0, 280), desc.length > 280 ? "…" : ""]
					}),
					book && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/books/$slug",
						params: { slug: book.slug },
						className: "mt-4 inline-block text-sm text-gold",
						children: book.title
					})
				]
			})]
		})
	});
}
//#endregion
export { CharactersPage as component };
