import { r as statusLabel } from "./urls-BA2l0Qq9.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as readingUrl, m as tropesList, o as amazonUrl, y as inferGenre } from "./router-DqOoZbIV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-skeleton-B9tNf4gt.js
var import_jsx_runtime = require_jsx_runtime();
function BookCard({ book, settings = {} }) {
	const status = statusLabel(book.status, book.category);
	const tropes = tropesList(book, 3);
	const amazon = amazonUrl(book);
	const read = readingUrl(book, settings);
	const coming = status === "Coming Soon";
	const genre = inferGenre(book.title, book.tropes, book.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-frame group flex h-full flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/books/$slug",
			params: { slug: book.slug },
			className: "block no-underline",
			"aria-label": book.title,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative aspect-cover overflow-hidden bg-charcoal",
				children: book.cover_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: book.cover_url,
					alt: `Cover of ${book.title}`,
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
					loading: "lazy"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display flex h-full items-center justify-center text-4xl text-gold",
					children: "ML"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: coming ? "badge badge-ox" : "badge",
						children: status
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tag",
						children: genre
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl leading-tight text-ivory",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/books/$slug",
						params: { slug: book.slug },
						children: book.title
					})
				}),
				book.blurb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-6 text-taupe",
					children: book.blurb
				}),
				tropes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: tropes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tag",
						children: t
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-wrap gap-2 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/books/$slug",
							params: { slug: book.slug },
							className: "btn min-h-9 px-3 text-xs tracking-widest",
							children: "View Book"
						}),
						read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: read,
							className: "btn btn-ghost min-h-9 px-3 text-xs tracking-widest",
							target: "_blank",
							rel: "noopener noreferrer",
							children: "Read Now"
						}),
						amazon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: amazon,
							className: "btn btn-ghost min-h-9 px-3 text-xs tracking-widest",
							target: "_blank",
							rel: "noopener noreferrer",
							children: "Buy on Amazon"
						}),
						coming && !amazon && !read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-ox",
							children: "Coming Soon"
						})
					]
				})
			]
		})]
	});
}
function BookSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-frame overflow-hidden",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton aspect-cover" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-24" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-7 w-3/4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-16 w-full" })
			]
		})]
	});
}
function BookGridSkeleton({ count = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
		"aria-busy": "true",
		"aria-label": "Loading books",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookSkeleton, {}, i))
	});
}
//#endregion
export { BookGridSkeleton as n, BookCard as t };
