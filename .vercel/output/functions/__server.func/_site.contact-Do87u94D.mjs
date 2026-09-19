import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as submitContact } from "./_ssr/contact-8EhAGb7u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.contact-Do87u94D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		setStatus("sending");
		setError("");
		try {
			await submitContact({ data: {
				name,
				email,
				subject,
				message,
				website
			} });
			setStatus("sent");
			setName("");
			setEmail("");
			setSubject("");
			setMessage("");
		} catch {
			setStatus("error");
			setError("The message could not be sent. Please try again.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-4 !justify-start",
				children: "Correspondence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl",
				children: "Contact"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 leading-8 text-taupe",
				children: "Write to Maxalena L. using the form below. There is no public email address on this site."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-8" }),
			status === "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-frame p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Message received"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-parchment",
					children: "Thank you. Your enquiry has been sent."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => void onSubmit(e),
				className: "card-frame space-y-4 p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							tabIndex: -1,
							autoComplete: "off",
							value: website,
							onChange: (e) => setWebsite(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-ui block text-xs uppercase tracking-widest text-taupe",
						children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							name: "name",
							autoComplete: "name",
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-ui block text-xs uppercase tracking-widest text-taupe",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "email",
							name: "email",
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-ui block text-xs uppercase tracking-widest text-taupe",
						children: ["Subject", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "subject",
							value: subject,
							onChange: (e) => setSubject(e.target.value),
							className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-ui block text-xs uppercase tracking-widest text-taupe",
						children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							name: "message",
							minLength: 10,
							rows: 8,
							value: message,
							onChange: (e) => setMessage(e.target.value),
							className: "mt-1 w-full border border-gold/25 bg-charcoal px-3 py-2 text-sm text-ivory"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-parchment",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						type: "submit",
						disabled: status === "sending",
						children: status === "sending" ? "Sending…" : "Send message"
					})
				]
			})
		]
	});
}
//#endregion
export { ContactPage as component };
