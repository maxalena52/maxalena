import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as Route$1 } from "./_ssr/router-BRDCOGnn.mjs";
import { a as inferGenre, i as cleanText, n as characterDisplayName, r as characterPublicCopy } from "./_ssr/copy-CNt9qNSL.mjs";
import { t as coverSrc } from "./_ssr/covers-CWiKK2cQ.mjs";
import { n as shelfBooks } from "./_ssr/book-copy-DuJUW-1Y.mjs";
import { n as useLibrary, r as warningsList } from "./_ssr/use-library-BISHb0t-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.books._slug.index-DcNafo4e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookDetailPage() {
	const { slug } = Route$1.useParams();
	const { books, characters } = useLibrary();
	const shelf = shelfBooks(books);
	const book = shelf.find((b) => b.slug === slug);
	if (!book) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-5 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "page-title text-6xl",
			children: "Not in the library"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/books",
			className: "gold-pill mt-8",
			children: "All stories"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookLoaded, {
		book,
		characters,
		books: shelf
	});
}
function BookLoaded({ book, characters, books }) {
	const relatedChars = characters.filter((c) => c.book_id === book.id);
	const related = books.filter((b) => b.slug !== book.slug).slice(0, 2);
	const warnings = warningsList(book);
	const mature = warnings.some((w) => /18\+|smut|explicit|mature/i.test(w));
	const synopsis = cleanText(book.synopsis).split(/\n\n+/).filter(Boolean);
	const genre = inferGenre(book.title, book.tropes, book.status);
	const tropes = (book.tropes || []).filter(Boolean);
	const tags = [genre, ...tropes].filter((v, i, a) => v && a.indexOf(v) === i).slice(0, 4);
	const excerpt = cleanText(book.sample_chapter) || synopsis[0] || book.blurb || "";
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [shared, setShared] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		document.title = `${book.title} | Maxalena`;
		try {
			const raw = localStorage.getItem("maxalena-library");
			const list = raw ? JSON.parse(raw) : [];
			setSaved(list.includes(book.slug));
		} catch {
			setSaved(false);
		}
	}, [book.slug, book.title]);
	function toggleSaved() {
		const next = !saved;
		setSaved(next);
		try {
			const raw = localStorage.getItem("maxalena-library");
			const list = new Set(raw ? JSON.parse(raw) : []);
			if (next) list.add(book.slug);
			else list.delete(book.slug);
			localStorage.setItem("maxalena-library", JSON.stringify([...list]));
		} catch {}
	}
	async function share() {
		const url = window.location.href;
		try {
			if (navigator.share) await navigator.share({
				title: book.title,
				url
			});
			else await navigator.clipboard.writeText(url);
			setShared(true);
		} catch {
			setShared(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-6 md:px-6",
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
						to: "/books",
						className: "no-underline",
						children: "Stories"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " / " }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[#ffe7a8]",
						children: book.title
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-panel grid gap-6 p-4 md:grid-cols-[240px_1fr] md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl border border-pink-300/40",
					children: coverSrc(book) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: coverSrc(book),
						alt: `Cover of ${book.title}`,
						className: "aspect-[3/4] w-full object-cover"
					}) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl text-[#ffe7a8] md:text-6xl",
						children: book.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm tracking-[0.2em] text-pink-100/80 uppercase",
						children: "Maxalena"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chip",
							children: t
						}, t))
					}),
					book.blurb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg italic text-[#ffe7a8]",
						children: book.blurb
					}),
					synopsis[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-7 text-pink-50/90",
						children: synopsis[0]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/books/$slug/preview",
								params: { slug: book.slug },
								className: "gold-pill",
								children: "Read sample"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/books/$slug/preview",
								params: { slug: book.slug },
								className: "ghost-pill",
								children: "View chapters"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ghost-pill",
								onClick: toggleSaved,
								children: saved ? "Saved" : "Add to library"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ghost-pill",
								onClick: () => void share(),
								children: shared ? "Link copied" : "Share"
							})
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "glass-panel p-5 lg:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl text-[#ffe7a8]",
							children: "Synopsis"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-3 text-sm leading-6 text-pink-50/90",
							children: (synopsis.length ? synopsis : [book.blurb || ""]).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 32)))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "glass-panel p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl text-[#ffe7a8]",
							children: "Tropes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm text-pink-50/90",
							children: (tropes.length ? tropes : tags).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["♡ ", t] }, t))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "glass-panel p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-[#ffe7a8]",
								children: "Content notes"
							}), mature && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chip",
								children: "18+"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-6 text-pink-50/90",
							children: warnings.length ? `This story contains mature themes, including ${warnings.join(", ")}.` : "Content notes will be listed here when they are added."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-2",
				children: [relatedChars.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass-panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-[#ffe7a8]",
						children: "Character spotlight"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: relatedChars.slice(0, 2).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl",
								children: characterDisplayName(c.name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-[#ffe7a8]",
								children: c.role || "Character"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 text-pink-50/90",
								children: characterPublicCopy(c.name, c.description).slice(0, 220)
							})
						] }, c.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass-panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl text-[#ffe7a8]",
							children: "Excerpt preview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-3 text-sm italic leading-7 text-pink-50/90",
							children: [
								"“",
								excerpt.slice(0, 280),
								excerpt.length > 280 ? "…" : "",
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/books/$slug/preview",
							params: { slug: book.slug },
							className: "ghost-pill mt-4",
							children: "Read sample"
						})
					]
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-panel mt-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-[#ffe7a8]",
						children: "More stories you may like"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/books",
						className: "text-sm text-[#ffe7a8] no-underline",
						children: "View all stories"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: related.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/books/$slug",
						params: { slug: b.slug },
						className: "flex gap-3 no-underline",
						children: [coverSrc(b) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: coverSrc(b),
							alt: "",
							className: "h-24 w-16 rounded-lg object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-xl text-white",
							children: b.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 line-clamp-2 block text-sm text-pink-50/80",
							children: b.blurb
						})] })]
					}, b.slug))
				})]
			})
		]
	});
}
//#endregion
export { BookDetailPage as component };
