import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as useLibrary, t as socialLinks } from "./_ssr/use-library-CVxkl_Uc.mjs";
import { n as submitContact } from "./_ssr/contact-8EhAGb7u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.contact-Cv-qynZz.js
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
	const [news, setNews] = (0, import_react.useState)("");
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
			setNews("");
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
	function subscribe(e) {
		e.preventDefault();
		send({
			name: "Newsletter",
			email: news,
			subject: "Newsletter",
			message: "Please add this address to the Maxalena newsletter."
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: subscribe,
						className: "glass-panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-[#ffe7a8]",
								children: "Newsletter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pink-50/85",
								children: "New stories, universe notes, and the occasional announcement."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-col gap-2 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "email",
									value: news,
									onChange: (e) => setNews(e.target.value),
									placeholder: "Enter your email",
									className: "ink-input"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "gold-pill",
									disabled: status === "sending",
									children: "Subscribe"
								})]
							})
						]
					}),
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
							socials.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: s.href,
									className: "ghost-pill",
									target: "_blank",
									rel: "noopener noreferrer",
									children: s.label
								}, s.label))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-pink-100/70",
								children: "Social accounts will appear here when they are public."
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { ContactPage as component };
