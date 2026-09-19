import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { d as useRouterState, m as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as SiteFooter, y as SiteHeader } from "./_ssr/router-BlRO6hVU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site-0P9_-ROr.js
var import_jsx_runtime = require_jsx_runtime();
function SiteLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const reader = /\/books\/[^/]+\/preview\/?$/.test(pathname);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			!reader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SiteLayout as component };
