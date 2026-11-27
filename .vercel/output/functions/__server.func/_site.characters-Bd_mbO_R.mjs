import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as coverSrc } from "./_ssr/covers-CWiKK2cQ.mjs";
import { n as shelfBooks } from "./_ssr/book-copy-DuJUW-1Y.mjs";
import { n as useLibrary } from "./_ssr/use-library-BISHb0t-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.characters-Bd_mbO_R.js
var import_jsx_runtime = require_jsx_runtime();
var WORLDS = [
	{
		title: "Dark fantasy",
		body: "Curses, covenants, and forbidden love that burns in the dark.",
		slugs: ["blood-covenant", "the-dragon-commanders-captive"]
	},
	{
		title: "Office & power",
		body: "Ambition, control, and chemistry inside rooms where someone always has the advantage.",
		slugs: [
			"office-hours",
			"ceo-s-hostile-take-over",
			"the-algorithm-of-vengeance"
		]
	},
	{
		title: "Fate & the afterlife",
		body: "A doomed novel, Death himself, and a woman who refuses to stay disposable.",
		slugs: ["grim-reaper-chaos"]
	},
	{
		title: "Imperial romance",
		body: "Courts, widows, and desire that makes a dangerous alliance worse.",
		slugs: ["the-emperors-black-widow"]
	}
];
var PATHS = [
	{
		title: "Start here",
		body: "The bond and the affair. Blood Covenant, then Office Hours.",
		slug: "blood-covenant"
	},
	{
		title: "If you want something darker",
		body: "War, captivity, and a story that was written to kill her.",
		slug: "the-dragon-commanders-captive"
	},
	{
		title: "If you love antiheroes",
		body: "The CEO, the professor, and the bargain that stops being a bargain.",
		slug: "ceo-s-hostile-take-over"
	}
];
function UniversesPage() {
	const { books } = useLibrary();
	const shelf = shelfBooks(books);
	const bySlug = new Map(shelf.map((b) => [b.slug, b]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-title text-7xl md:text-8xl",
					children: "Universes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-2xl italic text-pink-50/90",
					children: "Explore the story worlds of Maxalena — where power, passion, and fate refuse to behave."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: WORLDS.map((world) => {
					const titles = world.slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
					const cover = titles[0] ? coverSrc(titles[0]) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass-panel grid grid-cols-[120px_1fr] gap-3 p-3 sm:grid-cols-[160px_1fr]",
						children: [cover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cover,
							alt: "",
							className: "h-full max-h-40 w-full rounded-xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-[#ffe7a8]",
								children: world.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-6 text-pink-50/90",
								children: world.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-pink-100/80",
								children: ["Titles: ", titles.map((b) => b.title).join(" · ")]
							}),
							titles[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/books/$slug",
								params: { slug: titles[0].slug },
								className: "ghost-pill mt-3 text-xs",
								children: "Explore universe"
							})
						] })]
					}, world.title);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "glass-panel mt-4 overflow-hidden p-4 md:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-4 md:grid-cols-[1fr_1.4fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl text-[#ffe7a8]",
							children: "Worlds of Maxalena"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-pink-50/90",
							children: "Kingdoms, offices, courts, and one novel that will not let its characters leave."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/books",
							className: "gold-pill mt-4",
							children: "Browse the stories"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/harbor-bg.png",
						alt: "",
						className: "h-48 w-full rounded-2xl object-cover md:h-56"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "page-title text-center text-5xl",
						children: "Reading paths"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-center text-sm italic text-pink-50/80",
						children: "Not sure where to begin? Start with one of these."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 md:grid-cols-3",
						children: PATHS.map((path) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/books/$slug",
							params: { slug: path.slug },
							className: "glass-panel block p-4 no-underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl text-[#ffe7a8]",
								children: path.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 text-pink-50/90",
								children: path.body
							})]
						}, path.title))
					})
				]
			})
		]
	});
}
//#endregion
export { UniversesPage as component };
