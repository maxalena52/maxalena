import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useNavigate, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn, o as __exportAll } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D75-wYbG.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview-CIDNfBJl.js
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-BRDCOGnn.js
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
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/books",
		label: "Stories"
	},
	{
		to: "/characters",
		label: "Universes"
	},
	{
		to: "/journal",
		label: "Journal"
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
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	function search(e) {
		e.preventDefault();
		navigate({ to: "/books" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-pink-400/40 bg-[#1a0630]/75 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1200px] items-center gap-3 px-3 py-2.5 md:px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex shrink-0 items-center gap-2 no-underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/author-portrait.jpg",
						alt: "",
						className: "h-9 w-9 rounded-full border border-[#ffe27a]/70 object-cover object-[30%_12%]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold tracking-wide text-[#ffe27a]",
						children: "maxalena.com"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden flex-1 items-center justify-center gap-1 lg:flex",
					"aria-label": "Primary",
					children: NAV.map((item) => {
						const on = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
						const home = item.label === "Home" && pathname === "/";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("rounded-full px-3 py-1.5 text-sm font-semibold no-underline", home ? "bg-[#ff4db8] text-white shadow-[0_0_14px_#ff4db8]" : on ? "text-[#ffe27a]" : "text-white/90 hover:text-[#ffe27a]"),
							children: item.label
						}, item.label);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					onSubmit: search,
					className: "ml-auto hidden items-center md:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search MAXALENA...",
						"aria-label": "Search stories",
						className: "w-40 rounded-full border border-pink-300/50 bg-[#2a0a40]/80 px-3 py-1.5 text-xs text-white outline-none placeholder:text-pink-100/50 lg:w-48"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "ml-auto rounded-full border border-pink-300/60 px-3 py-1.5 text-xs text-white lg:hidden",
					"aria-expanded": open,
					onClick: () => setOpen((v) => !v),
					children: open ? "Close" : "Menu"
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "flex flex-col gap-2 border-t border-pink-400/30 px-4 py-4 lg:hidden",
			"aria-label": "Mobile",
			children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				className: "text-white no-underline",
				children: item.label
			}, item.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit: search,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search MAXALENA...",
					className: "mt-2 w-full rounded-full border border-pink-300/50 bg-[#2a0a40] px-3 py-2 text-sm text-white"
				})
			})]
		})]
	});
}
function SiteFooter() {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "px-4 pb-8 pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center font-display text-2xl font-semibold text-[#ffe9b0] md:text-3xl",
			children: "Come wander through worlds built from colour, chaos, longing, and light."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-pink-100/70",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					children: "Privacy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/terms",
					children: "Terms"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/copyright",
					children: "Copyright"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/login",
					children: "Author desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					year,
					" Maxalena L."
				] })
			]
		})]
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
var styles_default = "/assets/styles-BL2l-zcS.css";
var APP_NAME = "Maxalena L.";
var DESCRIPTION = "Official site of Maxalena L., author of dark romance, romantasy, gothic fiction, and emotionally intense serialised stories.";
var Route$19 = createRootRoute({
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
			},
			{
				property: "og:title",
				content: "MAXALENA | I write what you pretend not to read"
			},
			{
				property: "og:description",
				content: DESCRIPTION
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "https://maxalena.com/"
			},
			{
				property: "og:image",
				content: "https://maxalena.com/og.jpg"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "MAXALENA | I write what you pretend not to read"
			},
			{
				name: "twitter:description",
				content: DESCRIPTION
			},
			{
				name: "twitter:image",
				content: "https://maxalena.com/og.jpg"
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
				href: "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Great+Vibes&family=Nunito:wght@500;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap"
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
var $$splitComponentImporter$18 = () => import("../_site-BaSptr8Y.mjs");
var Route$18 = createFileRoute("/_site")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./admin-rRckGftk.mjs");
var Route$17 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("../_site.index-CXi6AX__.mjs");
var Route$16 = createFileRoute("/_site/")({
	head: () => ({ meta: [{ title: "MAXALENA | I write what you pretend not to read" }, {
		name: "description",
		content: "Romantasy, dark fantasy, noir, and beautifully unconventional worlds."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("../_site.about-weghvSLX.mjs");
var Route$15 = createFileRoute("/_site/about")({
	head: () => ({ meta: [{ title: "About Maxalena" }, {
		name: "description",
		content: "An acquired taste. A questionable influence. An excellent distraction."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("../_site.books-CF0jU3k1.mjs");
var Route$14 = createFileRoute("/_site/books")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("../_site.characters-Bd_mbO_R.mjs");
var Route$13 = createFileRoute("/_site/characters")({
	head: () => ({ meta: [{ title: "Universes | Maxalena" }, {
		name: "description",
		content: "The story worlds of Maxalena — desire, danger, power, and fate."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("../_site.contact-CGJeCm95.mjs");
var Route$12 = createFileRoute("/_site/contact")({
	head: () => ({ meta: [{ title: "Contact | Maxalena" }, {
		name: "description",
		content: "Reach Maxalena with a message, idea, question, or opportunity."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("../_site.cookies-CFOST0UX.mjs");
var Route$11 = createFileRoute("/_site/cookies")({
	head: () => ({ meta: [{ title: "Cookie Policy | Maxalena L." }, {
		name: "description",
		content: "Cookie use on maxalena.com."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_site.copyright-M7ZdnqkY.mjs");
var Route$10 = createFileRoute("/_site/copyright")({
	head: () => ({ meta: [{ title: "Copyright and Takedown | Maxalena L." }, {
		name: "description",
		content: "Copyright notice for works by Maxalena L."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_site.journal-BZTYY6cz.mjs");
var Route$9 = createFileRoute("/_site/journal")({
	head: () => ({ meta: [{ title: "Journal | Maxalena" }, {
		name: "description",
		content: "Articles, notes, and updates from the worlds of Maxalena."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_site.privacy-BNcgJxOF.mjs");
var Route$8 = createFileRoute("/_site/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy | Maxalena L." }, {
		name: "description",
		content: "Privacy practices for maxalena.com."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_site.terms-CL1PdEzm.mjs");
var Route$7 = createFileRoute("/_site/terms")({
	head: () => ({ meta: [{ title: "Terms of Use | Maxalena L." }, {
		name: "description",
		content: "Terms of use for maxalena.com."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.index-Byzoo_yP.mjs");
var Route$6 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Author desk" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.callback-D1Io6Bxz.mjs");
var Route$5 = createFileRoute("/admin/callback")({
	head: () => ({ meta: [{ title: "Author sign in | Maxalena L." }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.login-BA58Aci4.mjs");
var Route$4 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Author sign in | Maxalena L." }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_site.books.index-BbssVEDR.mjs");
var Route$3 = createFileRoute("/_site/books/")({
	head: () => ({ meta: [{ title: "Stories | Maxalena" }, {
		name: "description",
		content: "Browse Maxalena's worlds of desire, danger, obsession, and dark romance."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_site.books._slug-BQveVWWv.mjs");
var Route$2 = createFileRoute("/_site/books/$slug")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_site.books._slug.index-DcNafo4e.mjs");
var Route$1 = createFileRoute("/_site/books/$slug/")({
	head: ({ params }) => ({ meta: [{ title: `${params.slug} | Maxalena` }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_site.books._slug.preview-Bb-VmhgY.mjs");
var Route = createFileRoute("/_site/books/$slug/preview")({
	loader: ({ params }) => getBookPreview({ data: { slug: params.slug } }),
	head: ({ params }) => ({ meta: [{ title: `Sample · ${params.slug} | Maxalena L.` }, {
		name: "robots",
		content: "noindex, follow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SiteRoute = Route$18.update({
	id: "/_site",
	getParentRoute: () => Route$19
});
var AdminRoute = Route$17.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$19
});
var SiteIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => SiteRoute
});
var SiteAboutRoute = Route$15.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => SiteRoute
});
var SiteBooksRoute = Route$14.update({
	id: "/books",
	path: "/books",
	getParentRoute: () => SiteRoute
});
var SiteCharactersRoute = Route$13.update({
	id: "/characters",
	path: "/characters",
	getParentRoute: () => SiteRoute
});
var SiteContactRoute = Route$12.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => SiteRoute
});
var SiteCookiesRoute = Route$11.update({
	id: "/cookies",
	path: "/cookies",
	getParentRoute: () => SiteRoute
});
var SiteCopyrightRoute = Route$10.update({
	id: "/copyright",
	path: "/copyright",
	getParentRoute: () => SiteRoute
});
var SiteJournalRoute = Route$9.update({
	id: "/journal",
	path: "/journal",
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
	SiteJournalRoute,
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
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFoundPage
	});
}
//#endregion
export { SiteHeader as a, SiteFooter as i, Route as n, getBookPreviewForAdmin as o, Route$1 as r, saveBookPreview as s, router_exports as t };
