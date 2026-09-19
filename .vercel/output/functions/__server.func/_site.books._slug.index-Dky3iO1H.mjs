import { o as __toESM } from "./_runtime.mjs";
import { r as statusLabel } from "./_ssr/urls-BA2l0Qq9.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as cleanText, a as useLibrary, g as characterPublicCopy, h as characterDisplayName, l as goodreadsUrl, m as warningsList, o as amazonUrl, p as tropesList, r as Route$1, v as inferGenre } from "./_ssr/router-DFnBLKVI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.books._slug.index-Dky3iO1H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WarningPanel({ warnings, mature }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	if (!warnings.length && !mature) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-frame p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-ui text-xs uppercase tracking-widest text-gold",
				children: "Content notes"
			}), mature && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "badge badge-ox mt-2",
				children: "18+ / Explicit content"
			})] }), warnings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-ghost min-h-9",
				"aria-expanded": open,
				onClick: () => setOpen((v) => !v),
				children: open ? "Hide content warnings" : "Reveal content warnings"
			})]
		}), open && warnings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 list-disc space-y-1 pl-5 text-sm text-parchment",
			children: warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: w }, w))
		})]
	});
}
function BookDetailPage() {
	const { slug } = Route$1.useParams();
	const { books, characters, loading, error, refetch } = useLibrary();
	const book = books.find((b) => b.slug === slug);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-8 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-10 md:grid-cols-[280px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton aspect-cover" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-10 w-2/3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-24 w-full" })]
			})]
		})]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-5 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This volume could not be loaded." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn mt-4",
			onClick: () => refetch(),
			children: "Retry"
		})]
	});
	if (!book) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-taupe",
				children: "The slug does not match a published title."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/books",
				className: "btn mt-8",
				children: "Explore the Books"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookLoaded, {
		book,
		characters,
		books
	});
}
function BookLoaded({ book, characters, books }) {
	const relatedChars = characters.filter((c) => c.book_id === book.id);
	const relatedBooks = books.filter((b) => b.id !== book.id).slice(0, 3);
	const warnings = warningsList(book);
	const mature = warnings.some((w) => /18\+|smut|explicit|mature/i.test(w));
	const amazon = amazonUrl(book);
	const goodreads = goodreadsUrl(book);
	const coming = statusLabel(book.status, book.category) === "Coming Soon";
	const synopsis = cleanText(book.synopsis).split(/\n\n+/).filter(Boolean);
	const art = (book.character_art_urls || []).filter(Boolean);
	const genre = inferGenre(book.title, book.tropes, book.status);
	(0, import_react.useEffect)(() => {
		document.title = `${book.title} by Maxalena L. | ${genre}`;
	}, [book.title, genre]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "font-ui mb-8 text-xs uppercase tracking-widest text-taupe",
				"aria-label": "Breadcrumb",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " / " }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/books",
						children: "Books"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " / " }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-parchment",
						children: book.title
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-[280px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-cover overflow-hidden bg-charcoal",
					children: book.cover_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: book.cover_url,
						alt: `Cover of ${book.title}`,
						className: "h-full w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display flex h-full items-center justify-center text-5xl text-gold",
						children: "ML"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: coming ? "badge badge-ox" : "badge",
							children: statusLabel(book.status, book.category)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tag",
							children: genre
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl leading-tight",
						children: book.title
					}),
					book.blurb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-8 text-taupe",
						children: book.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: tropesList(book).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tag",
							children: t
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/books/$slug/preview",
								params: { slug: book.slug },
								className: "btn",
								children: "Read sample"
							}),
							amazon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "btn btn-ghost",
								href: amazon,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Buy on Amazon"
							}),
							goodreads && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "btn btn-ghost",
								href: goodreads,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Goodreads"
							}),
							coming && !amazon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-ox",
								children: "Coming Soon"
							})
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningPanel, {
					warnings,
					mature
				})
			}),
			synopsis.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto mt-14 max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mb-4 text-3xl",
					children: "Synopsis"
				}), synopsis.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 leading-8 text-parchment",
					children: p
				}, p.slice(0, 24)))]
			}),
			relatedChars.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mb-6 text-3xl",
						children: "Characters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: relatedChars.map((c) => {
							const desc = characterPublicCopy(c.name, c.description);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "card-frame flex gap-4 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-28 w-24 shrink-0 overflow-hidden bg-charcoal",
									children: c.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: c.image_url,
										alt: "",
										className: "h-full w-full object-cover"
									}) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "badge mb-2",
										children: c.role || "Character"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl",
										children: characterDisplayName(c.name)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm leading-6 text-taupe",
										children: [desc.slice(0, 220), desc.length > 220 ? "…" : ""]
									})
								] })]
							}, c.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/characters",
						className: "btn btn-ghost mt-6",
						children: "All characters"
					})
				]
			}),
			art.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mb-6 text-3xl",
					children: "Character art"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: art.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						className: "w-full object-cover"
					}, src))
				})]
			}),
			relatedBooks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mb-6 text-3xl",
					children: "Further into the library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-parchment",
					children: relatedBooks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/books/$slug",
						params: { slug: b.slug },
						children: b.title
					}) }, b.id))
				})]
			})
		]
	});
}
//#endregion
export { BookDetailPage as component };
