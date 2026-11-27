import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as socialLinks, n as authorCopy, u as useLibrary } from "./_ssr/use-library-cL09V1Ok.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.about-DdGqEvRB.js
var import_jsx_runtime = require_jsx_runtime();
var FACTS = [
	"“My imagination has never been particularly well-behaved.”",
	"“I write fiction. My alibis are considerably less convincing.”",
	"“Some chapters are best enjoyed with the door closed.”",
	"“I have impeccable taste in fictional men and questionable taste in their intentions.”",
	"“I make no apologies for the temperature of my prose.”",
	"“Literary merit and indecent thoughts are not mutually exclusive.”",
	"“Respectability is a dress code, not a personality.”",
	"“Not everything I write is a confession. How unfortunate for the curious.”",
	"“I prefer my characters complicated, my dialogue intelligent, and my fictional affairs thoroughly inconvenient.”",
	"“My private life is not available for publication. My imagination, however, is remarkably affordable.”"
];
function AboutPage() {
	const { books, settings } = useLibrary();
	const copy = authorCopy(settings);
	const socials = socialLinks(settings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "read-panel p-6 md:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ornament mb-4 !justify-start",
					children: "The Author"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: copy.authorImage || "/author-portrait.jpg",
					alt: "Portrait of Maxalena L.",
					className: "mb-8 h-64 w-48 rounded-2xl border border-pink-300/40 object-cover object-[32%_18%] sm:h-72 sm:w-56"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl",
					children: "Maxalena"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-gold",
					children: "An acquired taste. A questionable influence. An excellent distraction."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-8" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-5 leading-8 text-parchment",
					children: copy.bio.split(/\n\n+/).filter((p) => p.trim() && !p.startsWith("An acquired taste")).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
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
					className: "mt-4 list-disc space-y-3 pl-5 leading-7 text-parchment",
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
		})
	});
}
//#endregion
export { AboutPage as component };
