import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as useLibrary } from "./_ssr/use-library-BAzJA7Ee.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.index-CrbpVCqp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GENRES = [
	"Romantasy",
	"Dark Fantasy",
	"Webnovel",
	"Serial",
	"Thriller",
	"Bite-Size Fiction"
];
var FEATURED = [
	{
		slug: "ceo-s-hostile-take-over",
		title: "The CEO's Hostile Takeover",
		cover: "/covers/ceo-s-hostile-take-over.jpg"
	},
	{
		slug: "office-hours",
		title: "Office Hours",
		cover: "/covers/office-hours.jpg"
	},
	{
		slug: "blood-covenant",
		title: "Blood Covenant",
		cover: "/covers/blood-covenant.jpg"
	},
	{
		slug: "the-dragon-commanders-captive",
		title: "The Dragon Commander's Captive",
		cover: "/covers/the-dragon-commanders-captive.jpg"
	},
	{
		slug: "grim-reaper-chaos",
		title: "Transmigrated into a Novel and Trapped the Grim Reaper",
		cover: "/covers/grim-reaper-chaos.png"
	},
	{
		slug: "the-emperors-black-widow",
		title: "The Emperor's Black Widow",
		cover: "/covers/the-emperors-black-widow.jpg"
	},
	{
		slug: "the-algorithm-of-vengeance",
		title: "The Algorithm of Vengeance",
		cover: "/covers/the-algorithm-of-vengeance.jpg"
	}
];
function HomePage() {
	const { books } = useLibrary();
	const [start, setStart] = (0, import_react.useState)(0);
	const shown = (0, import_react.useMemo)(() => {
		const out = [];
		for (let i = 0; i < FEATURED.length; i++) out.push(FEATURED[(start + i) % FEATURED.length]);
		return out;
	}, [start]);
	const known = new Set(books.map((b) => b.slug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1180px] px-3 pb-6 pt-3 md:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "overflow-hidden rounded-[28px] border-2 border-pink-400/70 shadow-[0_0_28px_rgb(255_60_170/0.45)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/hero-banner.png",
					alt: "MAXALENA — I write what you pretend not to read",
					className: "block h-auto w-full"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/books",
					className: "neon-pill",
					children: "Explore Stories →"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/journal",
					className: "neon-pill",
					children: "Read the Journal →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap justify-center gap-2",
				children: GENRES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/books",
					className: "neon-pill text-xs",
					children: g
				}, g))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "neon-panel mt-4 p-3 md:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold tracking-tight text-[#ffe27a]",
						children: "Featured Stories"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/books",
						className: "text-sm text-pink-100 no-underline hover:text-[#ffe27a]",
						children: "View All Stories →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-stretch gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Previous stories",
							className: "hidden w-8 shrink-0 rounded-full border border-pink-300/50 text-white sm:block",
							onClick: () => setStart((s) => (s - 1 + FEATURED.length) % FEATURED.length),
							children: "‹"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7",
							children: shown.map((book) => {
								const live = known.has(book.slug);
								const card = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: book.cover,
									alt: "",
									className: "aspect-[3/4] w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-1.5 pb-2 pt-8 text-center font-display text-sm font-semibold leading-tight text-white",
									children: book.title
								})] });
								return live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/books/$slug",
									params: { slug: book.slug },
									className: "group relative overflow-hidden rounded-2xl border border-pink-300/40 no-underline",
									children: card
								}, book.slug) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative overflow-hidden rounded-2xl border border-pink-300/40",
									children: card
								}, book.slug);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Next stories",
							className: "hidden w-8 shrink-0 rounded-full border border-pink-300/50 text-white sm:block",
							onClick: () => setStart((s) => (s + 1) % FEATURED.length),
							children: "›"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Story Universes",
						body: "The worlds, kingdoms, cities, and secret systems behind the stories.",
						cta: "Explore Universes →",
						to: "/characters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "New & Noteworthy",
						body: "Latest releases, ongoing serials, updates, and special features.",
						cta: "See What's New →",
						to: "/books"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Author Journal",
						body: "Behind the stories: thoughts, process, inspiration, travel, and creative musings.",
						cta: "Read the Journal →",
						to: "/journal"
					})
				]
			})
		]
	});
}
function Panel({ title, body, cta, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "neon-panel flex flex-col p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-3xl font-semibold tracking-tight text-[#ffe27a]",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 flex-1 text-sm leading-6 text-pink-50/90",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to,
				className: "neon-pill mt-4 w-fit text-sm",
				children: cta
			})
		]
	});
}
//#endregion
export { HomePage as component };
