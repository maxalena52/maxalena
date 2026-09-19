import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as __exportAll, n as createServerFn } from "./ssr.mjs";
import { n as getSupabase, t as createSsrRpc } from "./supabase-Cr5qzaz-.mjs";
import { n as normaliseStatus, t as isValidHttpUrl } from "./urls-BA2l0Qq9.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview-B0o1HBzr.js
var MAX_BODY = 8e4;
var getBookPreview = createServerFn({ method: "POST" }).validator((input) => object({ slug: string().min(1).max(120) }).parse(input)).handler(createSsrRpc("8c44b13b2a9683b3b5c14edda01b98072cd02fccd11556aab71b7b1c804098cf"));
var saveBookPreview = createServerFn({ method: "POST" }).validator((input) => object({
	accessToken: string().min(1),
	slug: string().min(1).max(120),
	chapterOneTitle: string().max(200),
	chapterOneBody: string().max(MAX_BODY),
	chapterTwoTitle: string().max(200),
	chapterTwoBody: string().max(MAX_BODY)
}).parse(input)).handler(createSsrRpc("65163f1efe7f467f3048c74544855a544889bb3070261531c8e3a9a9dea903f1"));
var getBookPreviewForAdmin = createServerFn({ method: "POST" }).validator((input) => object({
	accessToken: string().min(1),
	slug: string().min(1)
}).parse(input)).handler(createSsrRpc("3e9c412529332624378b47a398a3837b8fb6a9cd5cedee984e2fe75d30f864fc"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-6E2B80Am.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-obsidian px-6 text-center text-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-oxblood",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: "Something in the stacks has slipped"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-taupe",
				children: errorMessage(error)
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV$1 = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/books",
		label: "Books"
	},
	{
		to: "/characters",
		label: "Characters"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);
	const active = (to) => to === "/" ? pathname === "/" : pathname.startsWith(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-gold/15 bg-obsidian/92 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3 no-underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand-mark.png",
						alt: "",
						className: "h-10 w-10 object-contain",
						width: 40,
						height: 40
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl tracking-[0.08em] text-ivory",
						children: "Maxalena L."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "font-ui hidden items-center gap-8 text-[0.78rem] tracking-[0.18em] uppercase md:flex",
					"aria-label": "Primary",
					children: [NAV$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("pb-1 no-underline", active(item.to) ? "border-b border-gold text-gold" : "text-taupe hover:text-ivory"),
						children: item.label
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/books",
						className: "btn !min-h-9 !px-4 !text-[0.68rem]",
						children: "Explore Books"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "font-ui border border-gold/40 px-3 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-parchment md:hidden",
					"aria-expanded": open,
					"aria-controls": "mobile-nav",
					onClick: () => setOpen((v) => !v),
					children: open ? "Close" : "Menu"
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "mobile-nav",
			className: "border-t border-gold/15 bg-soft px-5 py-6 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "font-ui flex flex-col gap-4 text-sm tracking-[0.16em] uppercase",
				"aria-label": "Mobile",
				children: [NAV$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: active(item.to) ? "text-gold" : "text-parchment",
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/books",
					className: "btn mt-2 w-fit",
					children: "Explore Books"
				})]
			})
		})]
	});
}
var LOLA_NEW = "Lola has a filthy mouth and no patience for bullshit. After the Grim Reaper accidentally kills her and she awakens inside the novel she hated most, she decides that living quietly is not an option. But the harder she fights the story, the more she begins to realise that she may not control its plot as completely as she believed.";
var CASSIUS_NEW = "Cassius Thornwood is the kingdom’s most dangerous Fixer—a hunter tasked with eradicating the witches he has been taught to regard as pests. His certainty begins to fracture when he encounters Grace, the only witch he fails to kill.";
function cleanText(value) {
	if (!value) return "";
	return value.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/the kingdoms most dangerous fixer/gi, "the kingdom’s most dangerous Fixer").replace(/the only difference this is is that/gi, "the only difference is that").trim();
}
function characterPublicCopy(name, description) {
	const n = name.trim().toLowerCase();
	if (n.startsWith("lola daffodil")) return LOLA_NEW;
	if (n === "cassius thornwood") return CASSIUS_NEW;
	let text = cleanText(description);
	if (text.toLowerCase().includes("dirty mouth who isn't afraid") || text.toLowerCase().includes("dirty mouth who isn’t afraid")) return LOLA_NEW;
	if (text.includes("the only difference this is is")) text = text.replace(/He is every bit the antagonist a novel hero needs, the only difference this is is that the hero he is antagonizing happens to be the woman he is slowly falling in love with\./i, "He is every bit the antagonist a novel hero needs—except the hero he is opposing is the woman he is slowly falling in love with.");
	return text;
}
function characterDisplayName(name) {
	if (name.toLowerCase().startsWith("lola daffodil")) return "Lola Daffodil";
	if (name.includes("Raphael Grimwraith")) return "Raphael Grimwraith";
	return name.trim();
}
function inferGenre(title, tropes, status) {
	const blob = `${title} ${(tropes || []).join(" ")}`.toLowerCase();
	if (blob.includes("professor") || blob.includes("contemporary") || blob.includes("ceo") || blob.includes("corporate")) return "Contemporary forbidden romance";
	if (blob.includes("grim reaper") || blob.includes("mythology") || blob.includes("transmigrat")) return "Dark fantasy romance";
	if (blob.includes("witch") || blob.includes("dragon") || blob.includes("supernatural") || blob.includes("war")) return "Romantasy";
	if ((status || "").includes("ongoing")) return "Serialised romantasy";
	return "Dark romance";
}
async function fetchBooks() {
	const { data, error } = await getSupabase().from("books").select("id,title,slug,cover_url,blurb,synopsis,tropes,trigger_warnings,status,category,order_index,purchase_links,character_art_urls,created_at,updated_at").order("order_index", { ascending: true });
	if (error) throw error;
	return data || [];
}
async function fetchCharacters() {
	const { data, error } = await getSupabase().from("characters").select("*").order("order_index", { ascending: true });
	if (error) throw error;
	return data || [];
}
async function fetchSettings() {
	const { data, error } = await getSupabase().from("site_settings").select("key,value");
	if (error || !data) return {};
	const map = {};
	for (const row of data) map[row.key] = row.value;
	return map;
}
function parseReviews(settings) {
	const raw = settings.reviews_json;
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((r) => r && typeof r === "object" && typeof r.text === "string" && r.text.trim());
	} catch {
		return [];
	}
}
function visiblePurchaseLinks(book) {
	return (book.purchase_links || []).filter((link) => isValidHttpUrl(link.url));
}
function amazonUrl(book) {
	return visiblePurchaseLinks(book).find((l) => /amazon|kdp/i.test(l.platform || "") || /amazon\./i.test(l.url))?.url || null;
}
function goodreadsUrl(book) {
	return visiblePurchaseLinks(book).find((l) => /goodreads/i.test(l.platform || "") || /goodreads\./i.test(l.url))?.url || null;
}
function featuredBook(books, settings) {
	const slug = settings.featured_book_slug;
	if (slug) {
		const found = books.find((b) => b.slug === slug);
		if (found) return found;
	}
	return books.find((b) => normaliseStatus(b.status, b.category) === "published") || books[0] || null;
}
function socialLinks(settings) {
	const keys = [
		["instagram_url", "Instagram"],
		["tiktok_url", "TikTok"],
		["goodreads_url", "Goodreads"],
		["patreon_url", "Patreon"],
		["facebook_url", "Facebook"],
		["x_url", "X"],
		["twitter_url", "X"],
		["youtube_url", "YouTube"]
	];
	const seen = /* @__PURE__ */ new Set();
	const links = [];
	for (const [key, label] of keys) {
		const href = settings[key];
		if (isValidHttpUrl(href) && !seen.has(label)) {
			seen.add(label);
			links.push({
				label,
				href
			});
		}
	}
	return links;
}
function authorCopy(settings) {
	return {
		name: settings.author_display_name || "Maxalena L.",
		bio: settings.biography || "Maxalena L. writes the love stories that fight hardest to exist—the forbidden ones, the dangerous ones, the ones that cost everything. Her work lives in the space between romance and fantasy, dark and light, hope and despair. Her heroes are flawed. Her heroines are fierce. Her worlds are lived-in and treacherous, and her love stories make no promises except to be unforgettable.",
		intro: settings.homepage_introduction || "A storyteller who crafts dark romances and fantasy worlds so vivid that readers lose themselves completely. Every book is a descent into something beautiful and dangerous.",
		positioning: settings.footer_positioning || "Where dark romance meets unforgettable worlds. Stories that pull you in and refuse to let go.",
		contactMessage: settings.contact_availability_message || "Public enquiries are currently closed.",
		contactSupport: settings.contact_supporting_message || "Official contact and social links will appear here when they become available.",
		authorImage: isValidHttpUrl(settings.author_image_url) ? settings.author_image_url : null
	};
}
function warningsList(book) {
	return (book.trigger_warnings || []).map((w) => w.trim()).filter(Boolean);
}
function tropesList(book, limit) {
	const list = (book.tropes || []).map((t) => t.trim()).filter(Boolean);
	return typeof limit === "number" ? list.slice(0, limit) : list;
}
function groupBooks(books) {
	return {
		published: books.filter((b) => normaliseStatus(b.status, b.category) === "published"),
		ongoing: books.filter((b) => normaliseStatus(b.status, b.category) === "ongoing"),
		coming: books.filter((b) => normaliseStatus(b.status, b.category) === "coming_soon")
	};
}
function useBooks() {
	return useQuery({
		queryKey: ["books"],
		queryFn: fetchBooks,
		staleTime: 6e4
	});
}
function useCharacters() {
	return useQuery({
		queryKey: ["characters"],
		queryFn: fetchCharacters,
		staleTime: 6e4
	});
}
function useSettings() {
	return useQuery({
		queryKey: ["settings"],
		queryFn: fetchSettings,
		staleTime: 6e4
	});
}
function useLibrary() {
	const books = useBooks();
	const characters = useCharacters();
	const settings = useSettings();
	return {
		books: books.data ?? [],
		characters: characters.data ?? [],
		settings: settings.data ?? {},
		loading: books.isLoading || characters.isLoading,
		settingsLoading: settings.isLoading,
		error: books.error || characters.error,
		refetch: () => {
			books.refetch();
			characters.refetch();
			settings.refetch();
		}
	};
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/books",
		label: "Books"
	},
	{
		to: "/characters",
		label: "Characters"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteFooter() {
	const { data: settings = {} } = useSettings();
	const copy = authorCopy(settings);
	const socials = socialLinks(settings);
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const showCookies = Boolean(settings.analytics_enabled === "true" || settings.cookie_policy?.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-gold/16 bg-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-ivory",
						children: "Maxalena L."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm leading-7 text-taupe",
						children: copy.positioning
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ornament mb-4 !justify-start",
						children: "Navigate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "font-ui space-y-2 text-sm tracking-wide text-parchment",
						children: [
							NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								children: item.label
							}) }, item.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								children: "Privacy Policy"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								children: "Terms of Use"
							}) }),
							showCookies && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cookies",
								children: "Cookie Policy"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/copyright",
								children: "Copyright and Takedown"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/login",
								children: "Author desk"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: socials.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ornament mb-4 !justify-start",
						children: "Connect"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "font-ui space-y-2 text-sm text-parchment",
						children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": s.label,
							children: s.label
						}) }, s.label))
					})] }) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-5 py-6 text-center text-xs tracking-wide text-taupe",
				children: [
					"© ",
					year,
					" Maxalena L. All rights reserved."
				]
			})
		]
	});
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "site-bg min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					id: "main",
					className: "mx-auto max-w-2xl px-5 py-24 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ornament mb-4",
							children: "404"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl text-ivory",
							children: "This page is not in the library"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-taupe",
							children: "The volume you asked for is missing, unpublished, or never existed."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/books",
							className: "btn mt-8",
							children: "Explore the Books"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function QueryProvider({ children }) {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		retry: 1,
		refetchOnWindowFocus: false
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children
	});
}
var styles_default = "/assets/styles-BbOrEAdU.css";
var APP_NAME = "Maxalena L.";
var DESCRIPTION = "Official site of Maxalena L., author of dark romance, romantasy, gothic fiction, and emotionally intense serialised stories.";
var Route$18 = createRootRoute({
	errorComponent: AppErrorComponent,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Maxalena L. | Dark Romance & Romantasy Author" },
			{
				name: "description",
				content: DESCRIPTION
			},
			{
				name: "theme-color",
				content: "#080808"
			},
			{
				name: "application-name",
				content: APP_NAME
			},
			{
				name: "author",
				content: APP_NAME
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap"
			},
			{
				rel: "canonical",
				href: "https://maxalena.com/"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en-GB",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "site-bg min-h-screen bg-obsidian text-ivory",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#main",
					className: "skip-link",
					children: "Skip to content"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$17 = () => import("../_site-D484jqNh.mjs");
var Route$17 = createFileRoute("/_site")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./admin-rRckGftk.mjs");
var Route$16 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("../_site.index-Bcb5uLCo.mjs");
var Route$15 = createFileRoute("/_site/")({
	head: () => ({ meta: [{ title: "Maxalena L. | Dark Romance & Romantasy Author" }, {
		name: "description",
		content: "Dark romance. Fantasy worlds. Characters that haunt you long after the final page."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("../_site.about-Do_dmaPu.mjs");
var Route$14 = createFileRoute("/_site/about")({
	head: () => ({ meta: [{ title: "About Maxalena L. | Dark Romance & Fantasy Author" }, {
		name: "description",
		content: "Biography of Maxalena L., author of dark romance, romantasy, gothic fiction, and forbidden contemporary stories."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("../_site.books-CF0jU3k1.mjs");
var Route$13 = createFileRoute("/_site/books")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("../_site.characters-BYJyF_-0.mjs");
var Route$12 = createFileRoute("/_site/characters")({
	head: () => ({ meta: [{ title: "Characters | The Worlds of Maxalena L." }, {
		name: "description",
		content: "Heroes, heroines, and the figures who haunt the worlds of Maxalena L."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("../_site.contact-7SfuFL1g.mjs");
var Route$11 = createFileRoute("/_site/contact")({
	head: () => ({ meta: [{ title: "Contact | Maxalena L." }, {
		name: "description",
		content: "Write to Maxalena L. through the official contact form."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_site.cookies-Z9NvEgHh.mjs");
var Route$10 = createFileRoute("/_site/cookies")({
	head: () => ({ meta: [{ title: "Cookie Policy | Maxalena L." }, {
		name: "description",
		content: "Cookie use on maxalena.com."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_site.copyright-CvWHoFcT.mjs");
var Route$9 = createFileRoute("/_site/copyright")({
	head: () => ({ meta: [{ title: "Copyright and Takedown | Maxalena L." }, {
		name: "description",
		content: "Copyright notice for works by Maxalena L."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_site.privacy-Dm_Y5uKV.mjs");
var Route$8 = createFileRoute("/_site/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy | Maxalena L." }, {
		name: "description",
		content: "Privacy practices for maxalena.com."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_site.terms-BtJoLZu8.mjs");
var Route$7 = createFileRoute("/_site/terms")({
	head: () => ({ meta: [{ title: "Terms of Use | Maxalena L." }, {
		name: "description",
		content: "Terms of use for maxalena.com."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.index-vdS2SIkG.mjs");
var Route$6 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Author desk" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.callback-DaAmhJ_s.mjs");
var Route$5 = createFileRoute("/admin/callback")({
	head: () => ({ meta: [{ title: "Author sign in | Maxalena L." }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.login-BFRUpEhl.mjs");
var Route$4 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Author sign in | Maxalena L." }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_site.books.index-DCRwxhk8.mjs");
var Route$3 = createFileRoute("/_site/books/")({
	head: () => ({ meta: [{ title: "Books by Maxalena L. | Dark Romance, Fantasy & Romantasy" }, {
		name: "description",
		content: "Published books, ongoing serials, and coming-soon titles by Maxalena L."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_site.books._slug-BQveVWWv.mjs");
var Route$2 = createFileRoute("/_site/books/$slug")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_site.books._slug.index-D1BWiGA-.mjs");
var Route$1 = createFileRoute("/_site/books/$slug/")({
	head: ({ params }) => ({ meta: [{ title: `${params.slug} | Maxalena L.` }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_site.books._slug.preview-DcsPtTZj.mjs");
var Route = createFileRoute("/_site/books/$slug/preview")({
	loader: ({ params }) => getBookPreview({ data: { slug: params.slug } }),
	head: ({ params }) => ({ meta: [{ title: `Sample · ${params.slug} | Maxalena L.` }, {
		name: "robots",
		content: "noindex, follow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SiteRoute = Route$17.update({
	id: "/_site",
	getParentRoute: () => Route$18
});
var AdminRoute = Route$16.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$18
});
var SiteIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => SiteRoute
});
var SiteAboutRoute = Route$14.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => SiteRoute
});
var SiteBooksRoute = Route$13.update({
	id: "/books",
	path: "/books",
	getParentRoute: () => SiteRoute
});
var SiteCharactersRoute = Route$12.update({
	id: "/characters",
	path: "/characters",
	getParentRoute: () => SiteRoute
});
var SiteContactRoute = Route$11.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => SiteRoute
});
var SiteCookiesRoute = Route$10.update({
	id: "/cookies",
	path: "/cookies",
	getParentRoute: () => SiteRoute
});
var SiteCopyrightRoute = Route$9.update({
	id: "/copyright",
	path: "/copyright",
	getParentRoute: () => SiteRoute
});
var SitePrivacyRoute = Route$8.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => SiteRoute
});
var SiteTermsRoute = Route$7.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => SiteRoute
});
var AdminIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminCallbackRoute = Route$5.update({
	id: "/callback",
	path: "/callback",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$4.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var SiteBooksIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => SiteBooksRoute
});
var SiteBooksSlugRoute = Route$2.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => SiteBooksRoute
});
var SiteBooksSlugIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => SiteBooksSlugRoute
});
var SiteBooksSlugRouteChildren = {
	SiteBooksSlugPreviewRoute: Route.update({
		id: "/preview",
		path: "/preview",
		getParentRoute: () => SiteBooksSlugRoute
	}),
	SiteBooksSlugIndexRoute
};
var SiteBooksRouteChildren = {
	SiteBooksSlugRoute: SiteBooksSlugRoute._addFileChildren(SiteBooksSlugRouteChildren),
	SiteBooksIndexRoute
};
var SiteRouteChildren = {
	SiteAboutRoute,
	SiteBooksRoute: SiteBooksRoute._addFileChildren(SiteBooksRouteChildren),
	SiteCharactersRoute,
	SiteContactRoute,
	SiteCookiesRoute,
	SiteCopyrightRoute,
	SitePrivacyRoute,
	SiteTermsRoute,
	SiteIndexRoute
};
var SiteRouteWithChildren = SiteRoute._addFileChildren(SiteRouteChildren);
var AdminRouteChildren = {
	AdminCallbackRoute,
	AdminLoginRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	SiteRoute: SiteRouteWithChildren,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren)
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFoundPage
	});
}
//#endregion
export { cleanText as _, useLibrary as a, getBookPreviewForAdmin as b, featuredBook as c, parseReviews as d, socialLinks as f, characterPublicCopy as g, characterDisplayName as h, SiteFooter as i, goodreadsUrl as l, warningsList as m, Route as n, amazonUrl as o, tropesList as p, Route$1 as r, authorCopy as s, router_exports as t, groupBooks as u, inferGenre as v, saveBookPreview as x, SiteHeader as y };
