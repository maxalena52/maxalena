import { n as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { n as requireAuthor } from "./admin-auth-Bcy-RAnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/covers-A3t-gI6Y.js
var OWNER = "maxalena52";
var REPO = "maxalena";
var BRANCH = "main";
var ALLOWED = /* @__PURE__ */ new Set([
	"jpg",
	"jpeg",
	"png",
	"webp"
]);
function githubToken() {
	return (process.env.GITHUB_COVERS_TOKEN || process.env.GITHUB_TOKEN || "").trim();
}
var uploadBookCover_createServerFn_handler = createServerRpc({
	id: "d021e94b4de027a0768936676c61c2d8e816800f370a1bf82f9a8fdc06242f01",
	name: "uploadBookCover",
	filename: "src/lib/covers.ts"
}, (opts) => uploadBookCover.__executeServer(opts));
var uploadBookCover = createServerFn({ method: "POST" }).validator((input) => object({
	slug: string().min(1).max(120),
	filename: string().min(1).max(180),
	dataBase64: string().min(20).max(12e6)
}).parse(input)).handler(uploadBookCover_createServerFn_handler, async ({ data }) => {
	await requireAuthor();
	const token = githubToken();
	if (!token) throw new Error("Add GITHUB_COVERS_TOKEN in Vercel to upload covers to GitHub.");
	const ext = (data.filename.split(".").pop() || "").toLowerCase();
	if (!ALLOWED.has(ext)) throw new Error("Use a JPG, PNG, or WebP cover.");
	const safeSlug = data.slug.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
	const path = `public/covers/${safeSlug}.${ext === "jpeg" ? "jpg" : ext}`;
	const content = data.dataBase64.replace(/^data:[^;]+;base64,/, "");
	const headers = {
		accept: "application/vnd.github+json",
		authorization: `Bearer ${token}`,
		"x-github-api-version": "2022-11-28",
		"user-agent": "maxalena-desk"
	};
	const getUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
	let sha;
	const existing = await fetch(getUrl, { headers });
	if (existing.ok) sha = (await existing.json()).sha;
	if (!(await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
		method: "PUT",
		headers: {
			...headers,
			"content-type": "application/json"
		},
		body: JSON.stringify({
			message: `Add cover for ${safeSlug}`,
			content,
			branch: BRANCH,
			sha
		})
	})).ok) throw new Error("GitHub did not accept the cover. Check the token can write to the repo.");
	return {
		ok: true,
		coverUrl: `/${path.replace(/^public\//, "")}`
	};
});
//#endregion
export { uploadBookCover_createServerFn_handler };
