import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as useLibrary, t as socialLinks } from "./_ssr/use-library-BAzJA7Ee.mjs";
import { n as submitContact } from "./_ssr/contact-8EhAGb7u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.contact-Dj14sj7f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUBJECTS = [
	"General",
	"Rights & inquiries",
	"Collaboration",
	"A question about a story",
	"Something else"
];
function ContactPage() {
	const { settings } = useLibrary();
	const socials = socialLinks(settings);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [note, setNote] = (0, import_react.useState)("");
	async function send(data) {
		setStatus("sending");
		setNote("");
		try {
			await submitContact({ data: {
				...data,
				website
			} });
			setStatus("sent");
			setNote("Message received. Thank you.");
			setName("");
			setEmail("");
			setSubject("");
			setMessage("");
		} catch {
			setStatus("error");
			setNote("The message could not be sent. Please try again.");
		}
	}
	function onSubmit(e) {
		e.preventDefault();
		send({
			name,
			email,
			subject,
			message
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-5 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title text-7xl md:text-8xl",
				children: "Contact"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-pink-50/90 md:text-base",
				children: "We'd love to hear from you. Reach out with a message, idea, question, or opportunity."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1.4fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "glass-panel p-5 md:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl text-[#ffe7a8]",
						children: "Send a message"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-pink-50/80",
						children: "Have a question, a suggestion, or something you have been meaning to say."
					}),
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-bold",
							children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Your name",
								className: "ink-input mt-1"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-bold",
							children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "Your email address",
								className: "ink-input mt-1"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm font-bold",
						children: ["Subject", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							required: true,
							value: subject,
							onChange: (e) => setSubject(e.target.value),
							className: "ink-input mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Choose a subject..."
							}), SUBJECTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm font-bold",
						children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							minLength: 10,
							value: message,
							onChange: (e) => setMessage(e.target.value),
							placeholder: "Write your message here...",
							rows: 6,
							className: "ink-input mt-1"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "gold-pill mx-auto mt-5",
						disabled: status === "sending",
						children: status === "sending" ? "Sending..." : "Send message"
					}),
					note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-sm text-pink-50",
						children: note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-xs text-pink-100/70",
						children: "Your information is kept private and is used only to reply."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "glass-panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-[#ffe7a8]",
								children: "Rights & inquiries"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pink-50/85",
								children: "Publishing rights, media, and official requests."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "ghost-pill mt-3",
								href: "mailto:rights@maxalena.com",
								children: "rights@maxalena.com"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "glass-panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-[#ffe7a8]",
								children: "Collaboration"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pink-50/85",
								children: "A creative collaboration, partnership, or project."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "ghost-pill mt-3",
								href: "mailto:collab@maxalena.com",
								children: "collab@maxalena.com"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "glass-panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-[#ffe7a8]",
								children: "Social links"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pink-50/85",
								children: "Follow along for stories and what happens behind them."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "social-row",
								children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: s.href,
									className: "social-icon",
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": s.label,
									title: s.label,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, { name: s.label })
								}, s.label))
							})
						]
					})
				]
			})]
		})]
	});
}
function SocialIcon({ name }) {
	const common = {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": true
	};
	if (name === "YouTube") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		...common,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" })
	});
	if (name === "Instagram") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		...common,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm8.6 2.2a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 8.2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2z" })
	});
	if (name === "TikTok") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		...common,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 3c.4 2.6 1.8 4.4 4.2 4.8v2.4c-1.5 0-2.9-.5-4.2-1.4v6.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.6a3 3 0 1 0 2.1 2.9V3z" })
	});
	if (name === "X") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		...common,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 4h4.2l3.3 4.6L15.6 4H20l-6.1 7.2L20.4 20h-4.2l-3.6-5-4.4 5H4l6.6-7.6z" })
	});
	if (name === "Twitch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		...common,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 3h15v10l-4 4h-4l-2 2H8v-2H5zm3 2v8h3v2l2-2h4l2-2V5zm7 2h2v4h-2zm-4 0h2v4h-2z" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		...common,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.2 8.4a7.2 7.2 0 0 1 7.6 0l.6-1.6A9 9 0 0 0 7.6 6.8zm7.6 7.2-.6-1.6a7.2 7.2 0 0 1-7.6 0l-.6 1.6a9 9 0 0 0 8.8 0zM6.4 9.2 4.8 7.8a9 9 0 0 0 0 8.4l1.6-1.4a7.2 7.2 0 0 1 0-5.6zm11.2 0a7.2 7.2 0 0 1 0 5.6l1.6 1.4a9 9 0 0 0 0-8.4zM9.2 12a1.2 1.2 0 1 0 1.2 1.2A1.2 1.2 0 0 0 9.2 12zm5.6 0a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2z" })
	});
}
//#endregion
export { ContactPage as component };
