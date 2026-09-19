import { t as getSupabase } from "./supabase-BbIcayfE.mjs";
import { t as isValidHttpUrl } from "./urls-BA2l0Qq9.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { t as coverSrc } from "./covers-BuNMw5o3.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { n as requireAuthor } from "./admin-auth-Bcy-RAnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview-DkmNP3Cv.js
var MAX_CHAPTERS = 2;
var MAX_BODY = 8e4;
function paragraphsOf(body) {
	return body.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((p) => p.replace(/\n/g, " ").trim()).filter(Boolean);
}
function takeTwoFromManuscript(raw) {
	const text = raw.replace(/\r\n/g, "\n").trim();
	if (!text || /^https?:\/\//i.test(text)) return [];
	const parts = text.split(/\n(?=\s*(?:chapter\s+(?:\d+|[ivxlcdm]+|one|two|three|four|five|six|seven|eight|nine|ten)|prologue|epilogue)\b)/i);
	const source = (parts.length ? parts : [text]).map((c) => c.trim()).filter(Boolean);
	const out = [];
	for (let i = 0; i < Math.min(MAX_CHAPTERS, source.length); i++) {
		const chunk = source[i].slice(0, MAX_BODY);
		const firstLine = chunk.split("\n")[0]?.trim() ?? "";
		const looksLikeHeading = /^(chapter|prologue|epilogue)\b/i.test(firstLine);
		const title = looksLikeHeading ? firstLine : i === 0 ? "Chapter One" : "Chapter Two";
		const paragraphs = paragraphsOf(looksLikeHeading ? chunk.slice(firstLine.length).trim() : chunk);
		if (!paragraphs.length) continue;
		out.push({
			index: out.length + 1,
			title,
			paragraphs
		});
	}
	return out;
}
function chaptersFromFields(oneTitle, oneBody, twoTitle, twoBody) {
	const out = [];
	const one = paragraphsOf(oneBody.slice(0, MAX_BODY));
	const two = paragraphsOf(twoBody.slice(0, MAX_BODY));
	if (one.length) out.push({
		index: 1,
		title: oneTitle.trim() || "Chapter One",
		paragraphs: one
	});
	if (two.length) out.push({
		index: out.length + 1,
		title: twoTitle.trim() || "Chapter Two",
		paragraphs: two
	});
	return out.slice(0, MAX_CHAPTERS);
}
function pickLink(links, test) {
	return (links || []).find((l) => isValidHttpUrl(l.url) && test.test(`${l.platform || ""} ${l.url}`))?.url || null;
}
var getBookPreview_createServerFn_handler = createServerRpc({
	id: "8c44b13b2a9683b3b5c14edda01b98072cd02fccd11556aab71b7b1c804098cf",
	name: "getBookPreview",
	filename: "src/lib/preview.ts"
}, (opts) => getBookPreview.__executeServer(opts));
var getBookPreview = createServerFn({ method: "POST" }).validator((input) => object({ slug: string().min(1).max(120) }).parse(input)).handler(getBookPreview_createServerFn_handler, async ({ data }) => {
	const empty = {
		found: false,
		slug: data.slug,
		title: "",
		coverUrl: null,
		amazonUrl: null,
		patreonUrl: null,
		readingUrl: null,
		status: null,
		chapters: []
	};
	const { data: book } = await getSupabase().from("books").select("title,slug,cover_url,status,category,purchase_links,sample_chapter").eq("slug", data.slug).maybeSingle();
	if (!book) return empty;
	const { data: settingsRows } = await getSupabase().from("site_settings").select("key,value");
	const settings = {};
	for (const row of settingsRows || []) settings[row.key] = row.value;
	const links = book.purchase_links || [];
	const amazonUrl = pickLink(links, /amazon|kdp/i);
	const patreonUrl = pickLink(links, /patreon/i) || (isValidHttpUrl(settings.patreon_url) ? settings.patreon_url : null);
	const readingSetting = settings[`reading_url_${book.slug}`];
	const sample = typeof book.sample_chapter === "string" ? book.sample_chapter : "";
	const readingUrl = isValidHttpUrl(readingSetting) ? readingSetting : isValidHttpUrl(sample) ? sample : pickLink(links, /read|wattpad|kindle|serial/i);
	let chapters = [];
	if (process.env.VERCEL && !process.env.DATABASE_URL) chapters = takeTwoFromManuscript(sample);
	else try {
		const { getSql } = await import("./db-BWQtg0ek.mjs");
		const rows = await (await getSql())`
        select chapter_one_title, chapter_one_body, chapter_two_title, chapter_two_body
        from book_previews
        where slug = ${data.slug}
        limit 1
      `;
		if (rows[0]) chapters = chaptersFromFields(rows[0].chapter_one_title, rows[0].chapter_one_body, rows[0].chapter_two_title, rows[0].chapter_two_body);
	} catch {
		chapters = [];
	}
	if (!chapters.length) chapters = takeTwoFromManuscript(sample);
	return {
		found: true,
		slug: book.slug,
		title: book.title,
		coverUrl: coverSrc(book) || book.cover_url,
		amazonUrl,
		patreonUrl,
		readingUrl,
		status: book.status,
		chapters
	};
});
var saveBookPreview_createServerFn_handler = createServerRpc({
	id: "65163f1efe7f467f3048c74544855a544889bb3070261531c8e3a9a9dea903f1",
	name: "saveBookPreview",
	filename: "src/lib/preview.ts"
}, (opts) => saveBookPreview.__executeServer(opts));
var saveBookPreview = createServerFn({ method: "POST" }).validator((input) => object({
	accessToken: string().min(1),
	slug: string().min(1).max(120),
	chapterOneTitle: string().max(200),
	chapterOneBody: string().max(MAX_BODY),
	chapterTwoTitle: string().max(200),
	chapterTwoBody: string().max(MAX_BODY)
}).parse(input)).handler(saveBookPreview_createServerFn_handler, async ({ data }) => {
	await requireAuthor(data.accessToken);
	const { getSql } = await import("./db-BWQtg0ek.mjs");
	await (await getSql())`
      insert into book_previews (slug, chapter_one_title, chapter_one_body, chapter_two_title, chapter_two_body, updated_at)
      values (
        ${data.slug},
        ${data.chapterOneTitle || "Chapter One"},
        ${data.chapterOneBody},
        ${data.chapterTwoTitle || "Chapter Two"},
        ${data.chapterTwoBody},
        now()
      )
      on conflict (slug) do update set
        chapter_one_title = excluded.chapter_one_title,
        chapter_one_body = excluded.chapter_one_body,
        chapter_two_title = excluded.chapter_two_title,
        chapter_two_body = excluded.chapter_two_body,
        updated_at = now()
    `;
	return { ok: true };
});
var getBookPreviewForAdmin_createServerFn_handler = createServerRpc({
	id: "3e9c412529332624378b47a398a3837b8fb6a9cd5cedee984e2fe75d30f864fc",
	name: "getBookPreviewForAdmin",
	filename: "src/lib/preview.ts"
}, (opts) => getBookPreviewForAdmin.__executeServer(opts));
var getBookPreviewForAdmin = createServerFn({ method: "POST" }).validator((input) => object({
	accessToken: string().min(1),
	slug: string().min(1)
}).parse(input)).handler(getBookPreviewForAdmin_createServerFn_handler, async ({ data }) => {
	await requireAuthor(data.accessToken);
	const { getSql } = await import("./db-BWQtg0ek.mjs");
	return (await (await getSql())`
      select chapter_one_title, chapter_one_body, chapter_two_title, chapter_two_body
      from book_previews where slug = ${data.slug} limit 1
    `)[0] || {
		chapter_one_title: "Chapter One",
		chapter_one_body: "",
		chapter_two_title: "Chapter Two",
		chapter_two_body: ""
	};
});
//#endregion
export { getBookPreviewForAdmin_createServerFn_handler, getBookPreview_createServerFn_handler, saveBookPreview_createServerFn_handler };
