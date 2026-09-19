import { o as __toESM } from "../_runtime.mjs";
import { t as getSupabase } from "./supabase-BbIcayfE.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as verifyAuthorSession, n as isAuthorEmail, t as AUTHOR_EMAIL } from "./admin-auth-BDRixHf6.mjs";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sb = getSupabase();
		const { data: sub } = sb.auth.onAuthStateChange(async (event, session) => {
			if (!session) return;
			if (event !== "INITIAL_SESSION" && event !== "SIGNED_IN") return;
			if (!isAuthorEmail(session.user.email)) {
				await sb.auth.signOut();
				setError("This desk is restricted to magdalenashade@gmail.com. Sign in with that Google account.");
				return;
			}
			try {
				await verifyAuthorSession({ data: { accessToken: session.access_token } });
				await navigate({ to: "/admin" });
			} catch {
				await sb.auth.signOut();
				setError("This desk is restricted to magdalenashade@gmail.com.");
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
				queryParams: {
					prompt: "select_account",
					login_hint: AUTHOR_EMAIL
				}
			}
		});
		if (err) {
			setBusy(false);
			setError("Google sign-in is not available yet. The Google provider still needs to be switched on for this site.");
		}
	}
	return (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-5",
		children: [
			(0, import_jsx_runtime.jsx)("p", { className: "ornament mb-4", children: "Private desk" }),
			(0, import_jsx_runtime.jsx)("h1", { className: "font-display text-4xl", children: "Author sign in" }),
			(0, import_jsx_runtime.jsxs)("p", { className: "mt-3 text-sm leading-6 text-taupe", children: ["Use Google with ", AUTHOR_EMAIL, " only. There is no password. Any other Google account is refused."] }),
			error ? (0, import_jsx_runtime.jsx)("p", { className: "mt-6 text-sm text-parchment", children: error }) : null,
			(0, import_jsx_runtime.jsx)("button", { className: "btn mt-8 w-full", disabled: busy, type: "button", onClick: () => void signInWithGoogle(), children: busy ? "Opening Google\u2026" : "Continue with Google" }),
			(0, import_jsx_runtime.jsx)("p", { className: "mt-8 text-center text-sm text-taupe", children: (0, import_jsx_runtime.jsx)(Link, { to: "/", children: "Back to the site" }) })
		]
	});
}
export { AdminLoginPage as component };
