import { t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as getSupabase } from "./supabase-BbIcayfE.mjs";
import { t as isValidHttpUrl } from "./urls-BA2l0Qq9.mjs";
import { t as applyBookCopy } from "./book-copy-DY41s1ai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-library-COU1plfd.js
var LOLA_NEW = "Lola has a filthy mouth and no patience for bullshit. After the Grim Reaper accidentally kills her and she awakens inside the novel she hated most, she decides that living quietly is not an option. But the harder she fights the story, the more she begins to realise that she may not control its plot as completely as she believed.";
var CASSIUS_NEW = "Cassius Thornwood is the kingdom’s most dangerous Fixer—a hunter tasked with eradicating the witches he has been taught to regard as pests. His certainty begins to fracture when he encounters Grace, the only witch he fails to kill.";
function cleanText(value) {
	if (!value) return "";
	return value.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/the kingdoms most dangerous fixer/gi, "the kingdom’s most dangerous Fixer").replace(/the only difference this is is that/gi, "the only difference is that").trim();
}
function characterPublicCopy(name, description) {
	const n = name.trim().toLowerCase();
	if (n.startsWith("lola daffodil")) return LOLA_NEW;
	if (n === "cassius thornwood") return CASSIUS_NEW;
	let text = cleanText(description);
	if (text.toLowerCase().includes("dirty mouth who isn't afraid") || text.toLowerCase().includes("dirty mouth who isn’t afraid")) return LOLA_NEW;
	if (text.includes("the only difference this is is")) text = text.replace(/He is every bit the antagonist a novel hero needs, the only difference this is is that the hero he is antagonizing happens to be the woman he is slowly falling in love with\./i, "He is every bit the antagonist a novel hero needs—except the hero he is opposing is the woman he is slowly falling in love with.");
	return text;
}
function characterDisplayName(name) {
	if (name.toLowerCase().startsWith("lola daffodil")) return "Lola Daffodil";
	if (name.includes("Raphael Grimwraith")) return "Raphael Grimwraith";
	return name.trim();
}
function inferGenre(title, tropes, status) {
	const blob = `${title} ${(tropes || []).join(" ")}`.toLowerCase();
	if (blob.includes("professor") || blob.includes("contemporary") || blob.includes("ceo") || blob.includes("corporate")) return "Contemporary forbidden romance";
	if (blob.includes("grim reaper") || blob.includes("mythology") || blob.includes("transmigrat")) return "Dark fantasy romance";
	if (blob.includes("witch") || blob.includes("dragon") || blob.includes("supernatural") || blob.includes("war")) return "Romantasy";
	if ((status || "").includes("ongoing")) return "Serialised romantasy";
	return "Dark romance";
}
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
function visiblePurchaseLinks(book) {
	return (book.purchase_links || []).filter((link) => isValidHttpUrl(link.url));
}
function amazonUrl(book) {
	return visiblePurchaseLinks(book).find((l) => /amazon|kdp/i.test(l.platform || "") || /amazon\./i.test(l.url))?.url || null;
}
function goodreadsUrl(book) {
	return visiblePurchaseLinks(book).find((l) => /goodreads/i.test(l.platform || "") || /goodreads\./i.test(l.url))?.url || null;
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
function authorCopy(settings) {
	return {
		name: settings.author_display_name || "Maxalena L.",
		bio: settings.biography || "Maxalena L. writes the love stories that fight hardest to exist—the forbidden ones, the dangerous ones, the ones that cost everything. Her work lives in the space between romance and fantasy, dark and light, hope and despair. Her heroes are flawed. Her heroines are fierce. Her worlds are lived-in and treacherous, and her love stories make no promises except to be unforgettable.",
		intro: settings.homepage_introduction || "A storyteller who crafts dark romances and fantasy worlds so vivid that readers lose themselves completely. Every book is a descent into something beautiful and dangerous.",
		positioning: settings.footer_positioning || "Where dark romance meets unforgettable worlds. Stories that pull you in and refuse to let go.",
		contactMessage: settings.contact_availability_message || "Public enquiries are currently closed.",
		contactSupport: settings.contact_supporting_message || "Official contact and social links will appear here when they become available.",
		authorImage: isValidHttpUrl(settings.author_image_url) ? settings.author_image_url : "/author-portrait.jpg"
	};
}
function warningsList(book) {
	return (book.trigger_warnings || []).map((w) => w.trim()).filter(Boolean);
}
function tropesList(book, limit) {
	const list = (book.tropes || []).map((t) => t.trim()).filter(Boolean);
	return typeof limit === "number" ? list.slice(0, limit) : list;
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
export { cleanText as a, socialLinks as c, warningsList as d, characterPublicCopy as i, tropesList as l, authorCopy as n, goodreadsUrl as o, characterDisplayName as r, inferGenre as s, amazonUrl as t, useLibrary as u };
