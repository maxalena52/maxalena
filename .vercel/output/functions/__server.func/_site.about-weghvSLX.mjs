import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { t as DEFAULT_BIO } from "./_ssr/copy-CNt9qNSL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.about-weghvSLX.js
var import_jsx_runtime = require_jsx_runtime();
var PARAS = DEFAULT_BIO.split(/\n\n+/).filter((p) => !p.startsWith("An acquired taste"));
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-panel p-5 md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-6 md:grid-cols-[220px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/author-portrait.jpg",
						alt: "Portrait of Maxalena",
						className: "mx-auto h-52 w-52 rounded-full border-4 border-[#ffe7a8]/70 object-cover object-[32%_16%] shadow-[0_0_30px_rgb(255_80_160/0.45)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "page-title text-6xl md:text-7xl",
						children: "About Maxalena"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-4 leading-7 text-pink-50/95",
						children: PARAS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 24)))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-6 max-w-3xl rounded-full border border-[#ffe7a8]/50 px-6 py-3 text-center font-display text-2xl text-[#ffe7a8] italic md:text-3xl",
					children: "“I write what you pretend not to read.”"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "The persona",
							body: "An unreliable narrator of her own existence. A confession, an embellishment, or the beginning of another novel — that part is your problem."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "What she writes",
							body: "Sensual romance, dangerous obsessions, morally complicated characters, dark fantasy, and deliciously questionable circumstances."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "Favourite themes",
							body: "Desire. Power. Temptation. Intelligent seduction. Wicked humour. Beautiful villains. Formidable women. Men whose composure is worth dismantling."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "A few rules",
							body: "Pleasure need not apologise. Intimacy deserves literary attention. Respect the fiction. Come curious. Leave less innocent than you arrived."
						})
					]
				})
			]
		})
	});
}
function Card({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl border border-pink-300/35 bg-black/25 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl text-[#ffe7a8]",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-6 text-pink-50/90",
			children: body
		})]
	});
}
//#endregion
export { AboutPage as component };
