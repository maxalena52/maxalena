import { n as universeBySlug } from "./_ssr/universes-ESzdYHvU.mjs";
import { n as shelfBooks } from "./_ssr/book-copy-B8fwQdTf.mjs";
import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as Route$2 } from "./_ssr/router-zbDqz_0m.mjs";
import { t as coverSrc } from "./_ssr/covers-CWiKK2cQ.mjs";
import { n as useLibrary } from "./_ssr/use-library-CVxkl_Uc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.characters._slug-BBfGL_23.js
var import_jsx_runtime = require_jsx_runtime();
function UniversePage() {
	const { slug } = Route$2.useParams();
	const world = universeBySlug(slug);
	const { books } = useLibrary();
	const shelf = shelfBooks(books);
	if (!world) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-5 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "page-title text-6xl",
			children: "Universe not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/characters",
			className: "gold-pill mt-8",
			children: "All universes"
		})]
	});
	const titles = world.books.map((id) => shelf.find((b) => b.slug === id)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-3 py-6 md:px-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-3 text-sm text-pink-100/80",
				"aria-label": "Breadcrumb",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "no-underline",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " / " }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/characters",
						className: "no-underline",
						children: "Universes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " / " }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[#ffe7a8]",
						children: [world.name, " Universe"]
					})
				]
			}),
			world.bakedHero ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: world.hero,
				alt: `The ${world.name} Universe`,
				className: "uni-hero-baked"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "uni-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: world.hero,
					alt: ""
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "uni-hero-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "uni-kicker",
							children: "The"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: world.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "uni-kicker",
							children: "Universe"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "uni-tagline",
							children: world.tagline
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "uni-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "About This Universe" }), world.about.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 32)))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "uni-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { name: "rose" }), " Key Elements"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "uni-elements",
						children: world.elements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { name: item.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.text })] }, item.text))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "uni-panel mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "uni-world-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { name: "compass" }), " The Universe of This Story"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: world.worldLine })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "uni-scenes",
					children: world.scenes.map((scene) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: scene.src,
						alt: scene.alt
					}, scene.src))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "uni-mood mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "uni-mood-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { name: "quill" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "The Mood & Vibe" }) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "uni-moods",
					children: world.moods.map((mood) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { name: mood.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mood.label })] }, mood.label))
				})]
			}),
			titles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "uni-panel mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Stories in this universe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: titles.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/books/$slug",
						params: { slug: book.slug },
						className: "flex gap-3 no-underline",
						children: [coverSrc(book) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: coverSrc(book),
							alt: "",
							className: "h-24 w-16 rounded-lg object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-xl text-white",
							children: book.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 line-clamp-3 block text-sm text-pink-50/80",
							children: book.blurb
						})] })]
					}, book.slug))
				})]
			})
		]
	});
}
function Mark({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "uni-mark",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		"aria-hidden": true,
		children: [
			name === "rose" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21s-6-3.4-6-8a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-6 8-8 8z" }),
			name === "crown" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 17h18l-1.5-8-4.5 4L12 6l-3 7-4.5-4L3 17z" }),
			name === "heart" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 19s-7-4.2-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.8-7 9-7 9z" }),
			name === "swords" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 4l10 10M17 4L7 14M5 19l4-4M19 19l-4-4" }),
			name === "lotus" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 19c-4-3-6-6-6-8 2 0 4 1 6 3 2-2 4-3 6-3 0 2-2 5-6 8zM12 14c-2-3-2-6 0-8 2 2 2 5 0 8z" }),
			name === "infinity" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 12c1.8-2.4 3.2-2.4 5 0s3.2 2.4 5 0c1.4-1.8.4-3-1.2-3-2 0-3.2 2-3.8 3-.6-1-1.8-3-3.8-3C6.6 9 5.6 10.2 7 12z" }),
			name === "moon" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 4a8 8 0 1 0 4 12 6 6 0 0 1-4-12z" }),
			name === "hourglass" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 4h12M6 20h12M7 4c0 4 5 5 5 8s-5 4-5 8M17 4c0 4-5 5-5 8s5 4 5 8" }),
			name === "flame" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21c4 0 6-3 6-6 0-4-3-5-3-8 0 2-2 3-3 3-2-3-1-7 1-9-5 2-8 6-8 10 0 5 3 10 7 10z" }),
			name === "fleur" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 12c2-3 2-6 0-6s-2 3 0 6zm0 0c-2-3-2-6 0-6s2 3 0 6zm0 0c3 2 6 2 6 0s-3-2-6 0zm0 0c-3 2-6 2-6 0s3-2 6 0zM12 12v8" }),
			name === "peaks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 18l5-8 4 5 3-4 6 7H3z" }),
			name === "compass" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "8"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.5 9.5l-1 4-4 1 1-4 4-1z" })] }),
			name === "quill" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 4c-6 1-10 5-12 9l-3 7 7-3c4-2 8-6 9-12zM8 16l2 2" })
		]
	});
}
//#endregion
export { UniversePage as component };
