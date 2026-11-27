import { t as applyBookCopy } from "./book-copy-B8fwQdTf.mjs";
import { t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as getSupabase } from "./supabase-BbIcayfE.mjs";
import { t as isValidHttpUrl } from "./urls-WBx1qNe-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-library-CVxkl_Uc.js
async function fetchBooks() {
	const { data, error } = await getSupabase().from("books").select("id,title,slug,cover_url,blurb,synopsis,tropes,trigger_warnings,status,category,order_index,purchase_links,character_art_urls,created_at,updated_at").order("order_index", { ascending: true });
	if (error) throw error;
	return (data || []).map(applyBookCopy);
}
async function fetchCharacters() {
	const { data, error } = await getSupabase().from("characters").select("*").order("order_index", { ascending: true });
	if (error) throw error;
	return data || [];
}
async function fetchSettings() {
	const { data, error } = await getSupabase().from("site_settings").select("key,value");
	if (error || !data) return {};
	const map = {};
	for (const row of data) map[row.key] = row.value;
	return map;
}
function socialLinks(settings) {
	const keys = [
		["instagram_url", "Instagram"],
		["tiktok_url", "TikTok"],
		["goodreads_url", "Goodreads"],
		["patreon_url", "Patreon"],
		["facebook_url", "Facebook"],
		["x_url", "X"],
		["twitter_url", "X"],
		["youtube_url", "YouTube"]
	];
	const seen = /* @__PURE__ */ new Set();
	const links = [];
	for (const [key, label] of keys) {
		const href = settings[key];
		if (isValidHttpUrl(href) && !seen.has(label)) {
			seen.add(label);
			links.push({
				label,
				href
			});
		}
	}
	return links;
}
function warningsList(book) {
	return (book.trigger_warnings || []).map((w) => w.trim()).filter(Boolean);
}
function useBooks() {
	return useQuery({
		queryKey: ["books"],
		queryFn: fetchBooks,
		staleTime: 6e4
	});
}
function useCharacters() {
	return useQuery({
		queryKey: ["characters"],
		queryFn: fetchCharacters,
		staleTime: 6e4
	});
}
function useSettings() {
	return useQuery({
		queryKey: ["settings"],
		queryFn: fetchSettings,
		staleTime: 6e4
	});
}
function useLibrary() {
	const books = useBooks();
	const characters = useCharacters();
	const settings = useSettings();
	return {
		books: books.data ?? [],
		characters: characters.data ?? [],
		settings: settings.data ?? {},
		loading: books.isLoading || characters.isLoading,
		settingsLoading: settings.isLoading,
		error: books.error || characters.error,
		refetch: () => {
			books.refetch();
			characters.refetch();
			settings.refetch();
		}
	};
}
//#endregion
export { useLibrary as n, warningsList as r, socialLinks as t };
