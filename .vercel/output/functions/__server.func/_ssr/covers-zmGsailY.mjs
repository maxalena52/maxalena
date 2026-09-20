import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D75-wYbG.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/covers-zmGsailY.js
var BY_SLUG = {
	"blood-covenant": "/covers/blood-covenant.jpg",
	"ceo-s-hostile-take-over": "/covers/ceo-s-hostile-take-over.jpg",
	"office-hours": "/covers/office-hours.jpg",
	"grim-reaper-chaos": "/covers/grim-reaper-chaos.png",
	"the-dragon-commanders-captive": "/covers/the-dragon-commanders-captive.jpg"
};
function coverSrc(book) {
	const stored = (book.cover_url || "").trim();
	if (stored.startsWith("/covers/")) return stored;
	if (book.slug && BY_SLUG[book.slug]) return BY_SLUG[book.slug];
	if (/^https?:\/\//i.test(stored)) return stored;
	if (stored) return `/covers/${stored.replace(/^\/+/, "")}`;
	return null;
}
createServerFn({ method: "POST" }).validator((input) => object({
	slug: string().min(1).max(120),
	filename: string().min(1).max(180),
	dataBase64: string().min(20).max(12e6)
}).parse(input)).handler(createSsrRpc("d021e94b4de027a0768936676c61c2d8e816800f370a1bf82f9a8fdc06242f01"));
//#endregion
export { coverSrc as t };
