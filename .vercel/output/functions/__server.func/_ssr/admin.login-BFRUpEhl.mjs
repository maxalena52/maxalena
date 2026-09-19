import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as verifyAuthorSession, i as startGoogleLogin } from "./admin-auth-D618edk9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-BFRUpEhl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		verifyAuthorSession().then(() => {
			window.location.replace("/admin");
		}).catch(() => {});
	}, []);
	async function signInWithGoogle() {
		setBusy(true);
		setError("");
		try {
			const { url } = await startGoogleLogin();
			window.location.href = url;
		} catch (err) {
			setBusy(false);
			setError(err instanceof Error ? err.message : "Google sign-in is not configured on Vercel yet.");
		}
	}
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
				children: "Continue with Google. Only the authorised account can enter."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-parchment",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn mt-8 w-full",
				disabled: busy,
				type: "button",
				onClick: () => void signInWithGoogle(),
				children: busy ? "Opening Google…" : "Continue with Google"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-center text-sm text-taupe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Back to the site"
				})
			})
		]
	});
}
//#endregion
export { AdminLoginPage as component };
