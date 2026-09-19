import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useLibrary, f as socialLinks, s as authorCopy } from "./_ssr/router-6E2B80Am.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.about-Do_dmaPu.js
var import_jsx_runtime = require_jsx_runtime();
var FACTS = [
	"Writes best between midnight and 3am.",
	"Keeps a playlist for every book—and every character.",
	"Treats the villain’s arc as seriously as the hero’s.",
	"Her characters argue with her constantly. She lets them win sometimes."
];
function AboutPage() {
	const { books, settings } = useLibrary();
	const copy = authorCopy(settings);
	const socials = socialLinks(settings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-4 !justify-start",
				children: "The Author"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-gold/30 bg-charcoal",
				children: copy.authorImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: copy.authorImage,
					alt: "Portrait of Maxalena L.",
					className: "h-full w-full rounded-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-4xl text-gold",
					children: "ML"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl",
				children: "Maxalena L."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-gold",
				children: "Dark Romance, Romantasy & Fantasy Author"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-8 text-parchment",
				children: copy.bio
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-12 text-3xl",
				children: "Themes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-8 text-taupe",
				children: "Forbidden love. Soul-bonds and broken oaths. Hunters and the hunted. Slow-burn obsession. Worlds that blur the line between light and shadow."
			}),
			books.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-12 text-3xl",
				children: "Selected works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: books.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/books/$slug",
					params: { slug: b.slug },
					children: b.title
				}) }, b.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-12 text-3xl",
				children: "Notes from the desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 list-disc space-y-2 pl-5 text-taupe",
				children: FACTS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f }, f))
			}),
			socials.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-12 text-3xl",
				children: "Find Maxalena L. online"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: s.href,
					target: "_blank",
					rel: "noopener noreferrer",
					children: s.label
				}) }, s.label))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/books",
					className: "btn",
					children: "Books"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/characters",
					className: "btn btn-ghost",
					children: "Characters"
				})]
			})
		]
	});
}
//#endregion
export { AboutPage as component };
