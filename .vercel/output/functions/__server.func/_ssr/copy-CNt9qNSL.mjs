//#region node_modules/.nitro/vite/services/ssr/assets/copy-CNt9qNSL.js
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
var DEFAULT_BIO = "An acquired taste. A questionable influence. An excellent distraction.\n\nMaxalena has a particular fascination with desire, power, temptation, and the wonderfully inconvenient things people do when good judgment abandons them.\n\nShe writes for the curious, the unashamed, and those whose reading habits are considerably less innocent than their public personalities suggest.\n\nHer stories wander between sensual romance, dangerous obsessions, morally complicated characters, dark fantasy, and deliciously questionable circumstances. She enjoys intelligent seduction, wicked humour, beautiful villains, formidable women, and men whose composure is worth dismantling.\n\nShe believes intimacy deserves as much literary attention as tragedy, that pleasure need not apologise for its existence, and that a perfectly respectable imagination is a terribly underutilised one.\n\nAs for the woman behind the words, Maxalena prefers to remain an unreliable narrator of her own existence. She might tell you something about herself over a glass of wine, but whether it is a confession, an embellishment, or the beginning of another novel is entirely your problem.\n\nSome things are better left to the imagination.\n\nShe writes what you pretend not to read.";
//#endregion
export { inferGenre as a, cleanText as i, characterDisplayName as n, characterPublicCopy as r, DEFAULT_BIO as t };
