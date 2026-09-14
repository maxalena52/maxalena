import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useSettings, s as authorCopy } from "./_ssr/router-DqOoZbIV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_site.contact-FAQ_Rw7W.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { data: settings = {} } = useSettings();
	const copy = authorCopy(settings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-5 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ornament mb-4",
				children: "Correspondence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl",
				children: "Contact"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-lg text-parchment",
				children: copy.contactMessage
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-taupe",
				children: copy.contactSupport
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/books",
				className: "btn mt-10",
				children: "Explore the Books"
			})
		]
	});
}
//#endregion
export { ContactPage as component };
