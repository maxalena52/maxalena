import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as normaliseStatus } from "./_ssr/urls-BA2l0Qq9.mjs";
import { a as useLibrary } from "./_ssr/router-6E2B80Am.mjs";
import { n as BookGridSkeleton, t as BookCard } from "./_ssr/book-skeleton-BemI3z1e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.books.index-DCRwxhk8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All Books"
	},
	{
		id: "published",
		label: "Published"
	},
	{
		id: "ongoing",
		label: "Ongoing Serials"
	},
	{
		id: "coming_soon",
		label: "Coming Soon"
	}
];
function BooksPage() {
	const { books, settings, loading, error, refetch } = useLibrary();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [genre, setGenre] = (0, import_react.useState)("all");
	const [trope, setTrope] = (0, import_react.useState)("all");
	const tropes = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		books.forEach((b) => (b.tropes || []).forEach((t) => set.add(t)));
		return Array.from(set).sort();
	}, [books]);
	const visible = books.filter((book) => {
		const status = normaliseStatus(book.status, book.category);
		if (filter !== "all" && status !== filter) return false;
		if (q && !book.title.toLowerCase().includes(q.toLowerCase())) return false;
		if (trope !== "all" && !(book.tropes || []).includes(trope)) return false;
		if (genre !== "all") {
			if (!`${book.title} ${(book.tropes || []).join(" ")}`.toLowerCase().includes(genre.toLowerCase())) return false;
		}
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-4 !justify-start",
				children: "The Library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl",
				children: "Books"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-taupe",
				children: "Dark romance, romantasy, and forbidden contemporary stories—published, serialised, and forthcoming."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-8" }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-frame p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The library failed to load." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn mt-4",
					onClick: () => refetch(),
					children: "Retry"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex flex-wrap items-end justify-between gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-taupe",
						"aria-live": "polite",
						children: loading ? "Loading titles…" : `${visible.length} ${visible.length === 1 ? "book" : "books"}`
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex flex-wrap gap-2",
					role: "tablist",
					"aria-label": "Publication status",
					children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": filter === f.id,
						className: filter === f.id ? "btn min-h-9 px-3" : "btn btn-ghost min-h-9 px-3",
						onClick: () => setFilter(f.id),
						children: f.label
					}, f.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 grid gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "font-ui text-xs uppercase tracking-widest text-taupe",
							children: ["Search by title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory",
								placeholder: "Search titles"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "font-ui text-xs uppercase tracking-widest text-taupe",
							children: ["Genre", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: genre,
								onChange: (e) => setGenre(e.target.value),
								className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "All genres"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "romance",
										children: "Romance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "fantasy",
										children: "Fantasy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "contemporary",
										children: "Contemporary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "supernatural",
										children: "Supernatural"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "font-ui text-xs uppercase tracking-widest text-taupe",
							children: ["Trope", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: trope,
								onChange: (e) => setTrope(e.target.value),
								className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All tropes"
								}), tropes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: t
								}, t))]
							})]
						})
					]
				}),
				loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookGridSkeleton, { count: 6 }) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-frame p-10 text-center text-taupe",
					children: "No titles match this search. Try another filter."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: visible.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, {
						book,
						settings
					}, book.id))
				})
			] })
		]
	});
}
//#endregion
export { BooksPage as component };
