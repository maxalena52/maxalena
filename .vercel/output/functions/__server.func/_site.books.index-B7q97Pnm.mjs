import { o as __toESM } from "./_runtime.mjs";
import { n as shelfBooks } from "./_ssr/book-copy-B8fwQdTf.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as coverSrc } from "./_ssr/covers-CWiKK2cQ.mjs";
import { n as useLibrary } from "./_ssr/use-library-BAzJA7Ee.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.books.index-B7q97Pnm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"All",
	"Dark Romance",
	"Fantasy",
	"Paranormal",
	"Ongoing",
	"Completed"
];
var TAGS = {
	"blood-covenant": [
		"Dark Romance",
		"Fantasy",
		"Completed"
	],
	"office-hours": ["Dark Romance", "Completed"],
	"ceo-s-hostile-take-over": ["Dark Romance", "Completed"],
	"grim-reaper-chaos": [
		"Fantasy",
		"Paranormal",
		"Completed"
	],
	"the-dragon-commanders-captive": [
		"Fantasy",
		"Dark Romance",
		"Completed"
	],
	"the-emperors-black-widow": [
		"Dark Romance",
		"Romantasy",
		"Completed"
	],
	"the-algorithm-of-vengeance": ["Dark Romance", "Completed"]
};
function tagsFor(book) {
	return TAGS[book.slug] || ["Dark Romance"];
}
function BooksPage() {
	const { books } = useLibrary();
	const [filter, setFilter] = (0, import_react.useState)("All");
	const visible = (0, import_react.useMemo)(() => shelfBooks(books), [books]).filter((book) => filter === "All" || tagsFor(book).includes(filter));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-title text-7xl md:text-8xl",
					children: "Stories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-2xl text-sm italic text-pink-50/90 md:text-base",
					children: "Browse Maxalena's worlds of desire, danger, obsession, and dark romance."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex flex-wrap justify-center gap-2",
				role: "tablist",
				"aria-label": "Story filters",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": filter === f,
					className: filter === f ? "gold-pill" : "ghost-pill",
					onClick: () => setFilter(f),
					children: f
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: visible.map((book) => {
					const cover = coverSrc(book);
					const labels = tagsFor(book).filter((t) => t !== "Completed" && t !== "Ongoing").slice(0, 2);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass-panel flex flex-col overflow-hidden p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/books/$slug",
								params: { slug: book.slug },
								className: "block overflow-hidden rounded-xl",
								children: cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: cover,
									alt: `Cover of ${book.title}`,
									className: "aspect-[3/4] w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex aspect-[3/4] items-center justify-center bg-[#1a0630] text-gold",
									children: "Cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip",
									children: "Published"
								}), labels.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip",
									children: t
								}, t))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-2xl text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/books/$slug",
									params: { slug: book.slug },
									className: "no-underline",
									children: book.title
								})
							}),
							book.blurb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-4 text-sm leading-6 text-pink-50/85",
								children: book.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex flex-wrap gap-2 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/books/$slug",
									params: { slug: book.slug },
									className: "gold-pill text-xs",
									children: "View Book"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/books/$slug/preview",
									params: { slug: book.slug },
									className: "ghost-pill text-xs",
									children: "Read Sample"
								})]
							})
						]
					}, book.slug);
				})
			})
		]
	});
}
//#endregion
export { BooksPage as component };
