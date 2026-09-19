import { o as __toESM } from "./_runtime.mjs";
import { r as statusLabel } from "./_ssr/urls-BA2l0Qq9.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-BNnudyjE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.books._slug.preview-CxdeKA7P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function guard(e) {
	e.preventDefault();
}
function PreviewReader({ preview }) {
	const rootRef = (0, import_react.useRef)(null);
	const coming = statusLabel(preview.status) === "Coming Soon";
	(0, import_react.useEffect)(() => {
		const el = rootRef.current;
		if (!el) return;
		const stop = (e) => e.preventDefault();
		const keys = (e) => {
			if (!(e.ctrlKey || e.metaKey)) return;
			if ([
				"c",
				"x",
				"a",
				"p",
				"s",
				"u"
			].includes(e.key.toLowerCase())) e.preventDefault();
		};
		const events = [
			"copy",
			"cut",
			"contextmenu",
			"dragstart",
			"selectstart"
		];
		for (const name of events) el.addEventListener(name, stop);
		el.addEventListener("keydown", keys);
		return () => {
			for (const name of events) el.removeEventListener(name, stop);
			el.removeEventListener("keydown", keys);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "reader-protect mx-auto max-w-3xl px-4 py-8 sm:px-6",
		onCopy: guard,
		onCut: guard,
		onContextMenu: guard,
		onDragStart: guard,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-ui mb-6 text-center text-xs uppercase tracking-[0.22em] text-gold",
				children: ["Sample · ", preview.title]
			}),
			preview.chapters.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reader-page mb-8 px-6 py-16 text-center sm:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ornament mb-4",
						children: "The sample"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl text-charcoal",
						children: "Preview coming soon."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-md text-base leading-7 text-taupe",
						children: "The first two chapters will appear here once they have been set for this title."
					})
				]
			}),
			preview.chapters.map((chapter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "reader-page mb-8 px-6 py-10 sm:px-14 sm:py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-ui text-[0.7rem] uppercase tracking-[0.28em] text-oxblood",
							children: ["Chapter ", chapter.index]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-3 text-3xl text-charcoal sm:text-4xl",
							children: chapter.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule mx-auto mt-6 max-w-xs opacity-40" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reader-body",
					children: chapter.paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, `${chapter.index}-${i}`))
				})]
			}, chapter.index)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reader-lock card-frame px-6 py-12 text-center sm:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ornament mb-6",
						children: "The story continues"
					}),
					preview.coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: preview.coverUrl,
						alt: "",
						draggable: false,
						className: "mx-auto mb-6 h-56 w-auto object-cover shadow-2xl"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display mx-auto mb-6 flex h-56 w-40 items-center justify-center bg-charcoal text-4xl text-gold",
						children: "ML"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-ivory sm:text-4xl",
						children: preview.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-md text-base leading-7 text-taupe",
						children: "The sample ends here. Continue the rest of the book through the official edition."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [
							preview.amazonUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "btn",
								href: preview.amazonUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Buy on Amazon"
							}),
							preview.patreonUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "btn",
								href: preview.patreonUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Continue on Patreon"
							}),
							preview.readingUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "btn btn-ghost",
								href: preview.readingUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Read the rest"
							}),
							coming && !preview.amazonUrl && !preview.patreonUrl && !preview.readingUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-ox",
								children: "Coming Soon"
							}),
							!coming && !preview.amazonUrl && !preview.patreonUrl && !preview.readingUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/books/$slug",
								params: { slug: preview.slug },
								className: "btn btn-ghost",
								children: "Return to the book"
							})
						]
					})
				]
			})
		]
	});
}
function PreviewPage() {
	const preview = Route.useLoaderData();
	if (!preview.found) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-4",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "This volume is not in the library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/books",
				className: "btn mt-8",
				children: "Explore the Books"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-3xl items-center justify-between px-5 pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/books/$slug",
				params: { slug: preview.slug },
				className: "font-ui text-xs uppercase tracking-widest text-taupe",
				children: "Close sample"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-ui text-xs uppercase tracking-widest text-gold",
				children: "Reader"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewReader, { preview })]
	});
}
//#endregion
export { PreviewPage as component };
