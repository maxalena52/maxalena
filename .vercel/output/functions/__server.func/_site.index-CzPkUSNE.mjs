import { r as statusLabel } from "./_ssr/urls-BA2l0Qq9.mjs";
import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useLibrary, c as featuredBook, d as parseReviews, o as amazonUrl, p as tropesList, s as authorCopy, u as groupBooks, v as inferGenre } from "./_ssr/router-D2LJUtFl.mjs";
import { n as BookGridSkeleton, t as BookCard } from "./_ssr/book-skeleton-Bw8n43px.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.index-CzPkUSNE.js
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const { books, characters, settings, loading, error, refetch } = useLibrary();
	const copy = authorCopy(settings);
	const featured = featuredBook(books, settings);
	const reviews = parseReviews(settings);
	const groups = groupBooks(books);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden px-5 pb-20 pt-16 md:pt-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ornament mb-6",
						children: "Maxalena L."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-5xl leading-none text-ivory md:text-7xl",
						children: ["Stories That", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-gold",
							children: "Consume You"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-xl text-lg leading-8 text-taupe",
						children: "Dark romance. Fantasy worlds. Characters that haunt you long after the final page."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/books",
							className: "btn",
							children: "Explore the Books"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "btn btn-ghost",
							children: "Meet Maxalena L."
						})]
					})
				]
			})
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-parchment",
				children: "The library could not be reached."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn mt-3",
				onClick: () => refetch(),
				children: "Retry"
			})]
		}),
		featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-6 !justify-start",
				children: "Featured"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-frame grid gap-8 p-6 md:grid-cols-[280px_1fr] md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/books/$slug",
					params: { slug: featured.slug },
					className: "block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-cover overflow-hidden bg-charcoal",
						children: featured.cover_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: featured.cover_url,
							alt: `Cover of ${featured.title}`,
							className: "h-full w-full object-cover"
						}) : null
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge",
								children: statusLabel(featured.status, featured.category)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tag",
								children: inferGenre(featured.title, featured.tropes, featured.status)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl text-ivory",
							children: featured.title
						}),
						featured.blurb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base leading-7 text-taupe",
							children: featured.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: tropesList(featured, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tag",
								children: t
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/books/$slug",
									params: { slug: featured.slug },
									className: "btn",
									children: "View Book"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/books/$slug/preview",
									params: { slug: featured.slug },
									className: "btn btn-ghost",
									children: "Read sample"
								}),
								amazonUrl(featured) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "btn btn-ghost",
									href: amazonUrl(featured),
									target: "_blank",
									rel: "noopener noreferrer",
									children: "Buy on Amazon"
								})
							]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ornament mb-3 !justify-start",
					children: "The Library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Latest Releases"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/books",
					className: "btn btn-ghost min-h-9",
					children: "View All"
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookGridSkeleton, { count: 3 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: books.slice(0, 3).map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, {
					book,
					settings
				}, book.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[220px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-gold/30 bg-charcoal",
				children: copy.authorImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: copy.authorImage,
					alt: "Author portrait of Maxalena L.",
					className: "h-full w-full rounded-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-6xl text-gold",
					children: "ML"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ornament mb-3 !justify-start",
					children: "The Author"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Meet Maxalena L."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-base leading-8 text-taupe",
					children: copy.intro
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/about",
					className: "btn mt-6",
					children: "Read Full Biography"
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ornament mb-3",
					children: "Discovery"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mb-8 text-center text-4xl md:text-5xl",
					children: "Enter the Worlds of Maxalena L."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldTile, {
							title: "Published",
							count: loading ? null : groups.published.length,
							to: "/books"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldTile, {
							title: "Ongoing Serials",
							count: loading ? null : groups.ongoing.length,
							to: "/books"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldTile, {
							title: "Coming Soon",
							count: loading ? null : groups.coming.length,
							to: "/books"
						})
					]
				}),
				characters.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: characters.slice(0, 4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/characters",
						className: "card-frame overflow-hidden no-underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-portrait bg-charcoal",
							children: c.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image_url,
								alt: "",
								className: "h-full w-full object-cover"
							}) : null
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display p-3 text-center text-lg",
							children: c.name.split("(")[0]
						})]
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex justify-center gap-3",
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
		}),
		reviews.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-4xl px-5 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-6",
				children: "Praise"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-8",
				children: reviews.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "card-frame p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl leading-snug text-parchment",
						children: [
							"“",
							r.text,
							"”"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-4 text-sm text-taupe",
						children: [r.reviewer, r.source ? ` — ${r.source}` : ""]
					})]
				}, i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-4xl px-5 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule mb-8" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Every book is a world waiting to swallow you whole."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/books",
							className: "btn",
							children: "Browse All Books"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/characters",
							className: "btn btn-ghost",
							children: "Meet the Characters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "btn btn-ghost",
							children: "About Maxalena L."
						})
					]
				})
			]
		})
	] });
}
function WorldTile({ title, count, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "card-frame p-6 no-underline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-ivory",
			children: title
		}), count === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton mt-2 h-4 w-16" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-taupe",
			children: [
				count,
				" ",
				count === 1 ? "title" : "titles"
			]
		})]
	});
}
//#endregion
export { HomePage as component };
