import { o as __toESM } from "../_runtime.mjs";
import { t as getSupabase } from "./supabase-BbIcayfE.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as verifyAuthorSession, n as isAuthorEmail, t as AUTHOR_EMAIL } from "./admin-auth-BDRixHf6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-bcMraFed.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)(AUTHOR_EMAIL);
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
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
				setError("This desk is restricted to the authorised author account.");
			}
		});
		return () => sub.subscription.unsubscribe();
	}, [navigate]);
	async function enterWithPassword(e) {
		e.preventDefault();
		setBusy(true);
		setError("");
		setNotice("");
		const sb = getSupabase();
		try {
			if (!isAuthorEmail(email)) {
				setError("This desk is restricted to the authorised author account.");
				return;
			}
			const { data, error: err } = await sb.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			if (err || !data.session) {
				setError("Sign-in failed. Use the email link if you do not have a password yet.");
				return;
			}
			await verifyAuthorSession({ data: { accessToken: data.session.access_token } });
			await navigate({ to: "/admin" });
		} catch {
			setError("Sign-in failed.");
		} finally {
			setBusy(false);
		}
	}
	async function emailSignInLink() {
		setBusy(true);
		setError("");
		setNotice("");
		const address = email.trim();
		if (!isAuthorEmail(address)) {
			setError("This desk is restricted to the authorised author account.");
			setBusy(false);
			return;
		}
		const { error: err } = await getSupabase().auth.signInWithOtp({
			email: address,
			options: {
				shouldCreateUser: true,
				emailRedirectTo: `${window.location.origin}/admin/login`
			}
		});
		setBusy(false);
		if (err) {
			setError("Could not send the sign-in email. Try again in a moment.");
			return;
		}
		setNotice(`A sign-in link is on its way to ${AUTHOR_EMAIL}. Open it on this device to enter the desk.`);
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-6 text-taupe",
				children: [
					"Sign in to add books, sample chapters, and characters. Only ",
					AUTHOR_EMAIL,
					" can enter."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => void enterWithPassword(e),
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-ui block text-xs uppercase tracking-widest text-taupe",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							autoComplete: "username",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "mt-1 w-full border border-gold/30 bg-charcoal px-3 py-2 text-sm text-ivory"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-ui block text-xs uppercase tracking-widest text-taupe",
						children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							autoComplete: "current-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "mt-1 w-full border border-gold/30 bg-charcoal px-3 py-2 text-sm text-ivory"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-parchment",
						children: error
					}),
					notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gold",
						children: notice
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn w-full",
						disabled: busy || !password,
						type: "submit",
						children: busy ? "Signing in…" : "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-ghost w-full",
						disabled: busy,
						type: "button",
						onClick: () => void emailSignInLink(),
						children: "Email me a sign-in link"
					})
				]
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
