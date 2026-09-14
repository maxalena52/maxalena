import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { m as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { b as SiteHeader, r as SiteFooter } from "./_ssr/router-DqOoZbIV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site-CHXV7s_r.js
var import_jsx_runtime = require_jsx_runtime();
function SiteLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SiteLayout as component };
