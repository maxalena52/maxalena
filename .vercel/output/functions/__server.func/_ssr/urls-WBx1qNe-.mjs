//#region node_modules/.nitro/vite/services/ssr/assets/urls-WBx1qNe-.js
var PLACEHOLDER = /* @__PURE__ */ new Set([
	"",
	"#",
	"/",
	"undefined",
	"null"
]);
function isValidHttpUrl(value) {
	if (!value) return false;
	const trimmed = value.trim();
	if (PLACEHOLDER.has(trimmed.toLowerCase())) return false;
	try {
		const url = new URL(trimmed);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}
function normaliseStatus(status, category) {
	const raw = (status || category || "").toLowerCase().replace(/\s+/g, "_");
	if (raw.includes("coming")) return "coming_soon";
	if (raw.includes("ongoing") || raw.includes("serial")) return "ongoing";
	return "published";
}
function statusLabel(status, category) {
	const s = normaliseStatus(status, category);
	if (s === "coming_soon") return "Coming Soon";
	if (s === "ongoing") return "Ongoing Serial";
	return "Published";
}
//#endregion
export { statusLabel as n, isValidHttpUrl as t };
