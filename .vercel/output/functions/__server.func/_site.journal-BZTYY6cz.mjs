import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.journal-BZTYY6cz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"Writing",
	"Updates",
	"Worldbuilding",
	"Recommendations",
	"Essays"
];
var POSTS = [
	{
		id: "heat",
		tab: "Writing",
		kicker: "Featured",
		title: "Behind the heat",
		summary: "A closer look at how the stories are written — from the first inconvenient spark to full combustion.",
		body: "She writes for the curious and the unashamed. Intimacy gets the same attention as tragedy, pleasure does not apologise, and a perfectly respectable imagination is a terribly underutilised one. The heat is never decoration. It is where the characters stop behaving."
	},
	{
		id: "notes",
		tab: "Writing",
		kicker: "Writing",
		title: "Writing notes",
		summary: "On process, habits, and the little rituals that keep the pages coming.",
		body: "“My imagination has never been particularly well-behaved.” Some chapters are best enjoyed with the door closed. The work happens late, and the characters are allowed to win the argument."
	},
	{
		id: "updates",
		tab: "Updates",
		kicker: "Updates",
		title: "Story updates",
		summary: "What is on the desk: Blood Covenant, Office Hours, the Dragon Commander, and the rest of the shelf.",
		body: "The library on this site is the current shelf. Covers, hooks, and warnings are updated here first. New titles appear on Stories when they are ready to be read."
	},
	{
		id: "trust",
		tab: "Worldbuilding",
		kicker: "Worldbuilding",
		title: "Characters I should not trust",
		summary: "A very subjective list of charming, dangerous, and suspicious people from the stories.",
		body: "Hunters who become shields. Professors who meant it as revenge. CEOs who refuse to give the acquisition back. Death, stuck inside a novel. None of them are safe, and that is the point."
	},
	{
		id: "midnight",
		tab: "Essays",
		kicker: "Essays",
		title: "Midnight musings",
		summary: "Late thoughts on stories, desire, and the useful chaos of being a writer.",
		body: "“I make no apologies for the temperature of my prose.” Literary merit and indecent thoughts are not mutually exclusive. Respectability is a dress code, not a personality."
	},
	{
		id: "recs",
		tab: "Recommendations",
		kicker: "Recommendations",
		title: "Where to start",
		summary: "If you want the bond, the office, or the war.",
		body: "Start with Blood Covenant for the hunter and the witch. Office Hours if you want the argument that turns into an affair. The Dragon Commander's Captive if captivity is the love story."
	}
];
function JournalPage() {
	const [tab, setTab] = (0, import_react.useState)("All");
	const [open, setOpen] = (0, import_react.useState)("heat");
	const posts = POSTS.filter((p) => tab === "All" || p.tab === tab);
	const featured = POSTS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-panel p-5 md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "page-title text-7xl md:text-8xl",
						children: "Journal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 italic text-pink-50/90",
						children: "Articles, notes, and updates from the worlds of Maxalena."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: tab === "All" ? "gold-pill" : "ghost-pill",
						onClick: () => setTab("All"),
						children: "All"
					}), TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: tab === t ? "gold-pill" : "ghost-pill",
						onClick: () => setTab(t),
						children: t
					}, t))]
				}),
				(tab === "All" || tab === "Writing") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mt-6 grid gap-4 rounded-2xl border border-[#ffe7a8]/30 bg-black/20 p-4 md:grid-cols-[280px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/harbor-bg.png",
						alt: "",
						className: "h-48 w-full rounded-xl object-cover md:h-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.25em] text-[#ffe7a8] uppercase",
							children: "Featured article"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-4xl text-[#ffe7a8]",
							children: featured.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 italic text-pink-50/90",
							children: featured.summary
						}),
						open === featured.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-7 text-pink-50/90",
							children: featured.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ghost-pill mt-4",
							onClick: () => setOpen(featured.id),
							children: "Read article"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: posts.filter((p) => p.id !== "heat").map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col rounded-2xl border border-pink-300/30 bg-black/25 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.65rem] tracking-[0.2em] text-[#ffe7a8] uppercase",
								children: post.kicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-2xl text-white",
								children: post.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 flex-1 text-sm leading-6 text-pink-50/85",
								children: open === post.id ? post.body : post.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ghost-pill mt-4",
								onClick: () => setOpen(post.id),
								children: open === post.id ? "Reading" : "Read article"
							})
						]
					}, post.id))
				})
			]
		})
	});
}
//#endregion
export { JournalPage as component };
