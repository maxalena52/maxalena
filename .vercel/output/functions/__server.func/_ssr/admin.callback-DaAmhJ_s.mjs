import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as finishGoogleLogin } from "./admin-auth-D618edk9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.callback-DaAmhJ_s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCallbackPage() {
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get("code") || "";
		const state = params.get("state") || "";
		if (!code || !state) {
			setError("Sign-in was cancelled.");
			return;
		}
		finishGoogleLogin({ data: {
			code,
			state
		} }).then(() => {
			window.location.replace("/admin");
		}).catch((err) => {
			setError(err instanceof Error ? err.message : "This desk is private.");
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-4",
				children: "Private desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Author sign in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-6 text-taupe",
				children: error || "Finishing sign-in…"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "btn mt-8 inline-flex justify-center",
				href: "/admin/login",
				children: "Try again"
			})
		]
	});
}
//#endregion
export { AdminCallbackPage as component };
