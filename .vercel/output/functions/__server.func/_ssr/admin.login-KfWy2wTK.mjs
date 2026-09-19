import { o as __toESM } from "../_runtime.mjs";
import { t as getSupabase } from "./supabase-BbIcayfE.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as verifyAuthorSession } from "./admin-auth-pZVjh40w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-KfWy2wTK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRIVATE_DESK = "This desk is private.";
function AdminLoginPage() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sb = getSupabase();
		const { data: sub } = sb.auth.onAuthStateChange(async (event, session) => {
			if (!session) return;
			if (event !== "INITIAL_SESSION" && event !== "SIGNED_IN") return;
			try {
				await verifyAuthorSession({ data: { accessToken: session.access_token } });
				await navigate({ to: "/admin" });
			} catch {
				await sb.auth.signOut();
				setError(PRIVATE_DESK);
			}
		});
		return () => sub.subscription.unsubscribe();
	}, [navigate]);
	async function signInWithGoogle() {
		setBusy(true);
		setError("");
		const { error: err } = await getSupabase().auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/admin/login`,
				queryParams: { prompt: "select_account" }
			}
		});
		if (err) {
			setBusy(false);
			setError("Google sign-in is not available yet.");
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
