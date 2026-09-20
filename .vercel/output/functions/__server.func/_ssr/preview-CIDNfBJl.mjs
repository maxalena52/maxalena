import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D75-wYbG.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-copy-BAYIOclk.js
var COPY = {
	"the-dragon-commanders-captive": {
		title: "The Dragon Commander's Captive",
		blurb: "She is the enemy doctor forced to heal his army. He is the Dragon Commander who should guard her—but has fallen too deeply to ever let her go.",
		synopsis: "Taken prisoner by enemy forces, a gifted doctor is forced to use her skills to keep their soldiers alive. Overseeing her is the feared Dragon Commander, a man tasked with watching her every move and ensuring she never escapes.\n\nBut somewhere between midnight treatments, battlefield wounds and bitter confrontations, vigilance becomes devotion. He cannot release her without betraying his army, yet keeping her means remaining the jailer of the woman he loves.\n\nShe insists that whatever she feels for him is merely the confusion of captivity. With the war sharpening every divided loyalty, she must decide whether loving her enemy is another kind of prison—and he must choose between keeping her beside him and becoming a man worthy of her trust.",
		trigger_warnings: [
			"War",
			"Imprisonment",
			"Power imbalance",
			"Violence",
			"Blood",
			"Medical injury",
			"Mature themes"
		]
	},
	"blood-covenant": {
		blurb: "He was sent to kill the last blood witch. One accidental covenant made her death his own—and turned her hunter into her shield.",
		synopsis: "Cassius is the kingdom's most feared Fixer, a ruthless hunter sent to eliminate creatures considered dangerous. Grace is the last blood witch, condemned to die simply for what she is.\n\nOne sword cut and one shared drop of blood awaken an ancient covenant. Now, if one of them dies, they both die—and they cannot move more than a mile apart.\n\nForced into each other's lives, hatred becomes reluctant dependence, dangerous desire and eventually a love neither of them was meant to survive. But the covenant only prevents Cassius from killing Grace. It cannot erase what he was, what her kind suffered, or the people still demanding her death.\n\nWhen the hunter becomes the hunted woman's fiercest protector, they must discover whether love can survive the forces determined to tear them apart.",
		trigger_warnings: [
			"Violence",
			"Blood",
			"Attempted murder",
			"Death threats",
			"Persecution",
			"Magical bonding",
			"Restricted autonomy",
			"Explicit sexual content",
			"Mature themes",
			"18+ (Smut)"
		]
	},
	"office-hours": {
		blurb: "He chose his student as an instrument of revenge. He never intended to become obsessed with her.",
		synopsis: "At twenty-two, provocative and sharp-witted postgraduate student Reina Chen refuses to be intimidated by Professor Finn Kane, the brilliant forty-year-old academic who continually singles her out in class.\n\nTheir intellectual battles become private confrontations, and those confrontations ignite a forbidden affair built on manipulation, challenge and dangerous chemistry.\n\nBut Finn's interest in Reina was never accidental. She is the daughter of the man connected to the betrayal that destroyed his family, and getting close to her was supposed to be revenge.\n\nThe problem is that Finn falls first—and far harder than he planned. With mutual blackmail, university rules, family secrets and betrayal closing around them, Reina must determine whether anything between them was real, while Finn must decide whether revenge is worth losing the woman he can no longer treat as a pawn.",
		trigger_warnings: [
			"Explicit sexual content",
			"Professor-student power imbalance",
			"Age-gap relationship",
			"Manipulation",
			"Obsession",
			"Revenge",
			"Family betrayal",
			"Infidelity themes",
			"Morally complex characters",
			"18+ (Smut)"
		]
	},
	"ceo-s-hostile-take-over": {
		blurb: "Publicly discarded by the man she helped build, Ariadne accepts a ruthless CEO's offer of revenge—only to become the one acquisition he refuses to surrender.",
		synopsis: "Ariadne Hector spent years standing beside her boyfriend, only for him to humiliate her publicly and dismiss her as \"just the secretary.\"\n\nThen Henry Zevelle—his forty-eight-year-old uncle and a notoriously ruthless CEO—offers her an exclusive-companion contract with one purpose: help him destroy his nephew's career.\n\nAriadne enters the bargain seeking revenge. Henry gives her the power and opportunity to become more than the woman his nephew discarded, transforming her from an overlooked secretary into a formidable executive.\n\nBut calculated seduction becomes obsession, and corporate warfare turns brutally personal. As Henry begins publicly claiming the woman his nephew underestimated, Ariadne must decide whether she is using the CEO's power to seize her future—or becoming the final prize in his hostile takeover.",
		trigger_warnings: [
			"Public humiliation",
			"Age-gap relationship",
			"Workplace power imbalance",
			"Emotional manipulation",
			"Possessive behaviour",
			"Revenge",
			"Family betrayal",
			"Contractual relationship",
			"Mature sexual content",
			"18+ (Smut)"
		]
	},
	"grim-reaper-chaos": {
		blurb: "She died by his hand, woke inside a doomed romance novel—and accidentally trapped Death himself inside it with her.",
		synopsis: "Lola was an ordinary modern woman until she awakened inside a tragic romance novel, occupying the body of a temporary character the story considered disposable.\n\nUnfortunately, the novel's immortal duke, Raphael Grimwraith, is also the living Grim Reaper—and he has already killed her once by accident.\n\nNow they are both trapped inside a story determined to end in tragedy. Lola wants to escape the novel before it kills her again. Raphael wants to understand how one impossible woman managed to alter his eternal existence.\n\nTheir combative alliance soon becomes dangerously intimate. Between cheating princes, murderous court schemes and homicidal shadow creatures, Lola must survive a plot written to discard her, while Raphael confronts the one thing immortality never prepared him for: the possibility of losing her.\n\nBut rewriting fate always demands a price—and Death has never been known for letting anyone leave empty-handed.",
		trigger_warnings: [
			"Accidental death",
			"Death themes",
			"Violence",
			"Supernatural danger",
			"Shadow monsters",
			"Infidelity",
			"Coercive dynamics",
			"Explicit sexual content",
			"Mature themes 18+ (Smut)"
		]
	}
};
function applyBookCopy(book) {
	const extra = COPY[book.slug];
	return extra ? {
		...book,
		...extra
	} : book;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/preview-CIDNfBJl.js
var MAX_BODY = 8e4;
var getBookPreview = createServerFn({ method: "POST" }).validator((input) => object({ slug: string().min(1).max(120) }).parse(input)).handler(createSsrRpc("8c44b13b2a9683b3b5c14edda01b98072cd02fccd11556aab71b7b1c804098cf"));
var saveBookPreview = createServerFn({ method: "POST" }).validator((input) => object({
	accessToken: string().min(1),
	slug: string().min(1).max(120),
	chapterOneTitle: string().max(200),
	chapterOneBody: string().max(MAX_BODY),
	chapterTwoTitle: string().max(200),
	chapterTwoBody: string().max(MAX_BODY)
}).parse(input)).handler(createSsrRpc("65163f1efe7f467f3048c74544855a544889bb3070261531c8e3a9a9dea903f1"));
var getBookPreviewForAdmin = createServerFn({ method: "POST" }).validator((input) => object({
	accessToken: string().min(1),
	slug: string().min(1)
}).parse(input)).handler(createSsrRpc("3e9c412529332624378b47a398a3837b8fb6a9cd5cedee984e2fe75d30f864fc"));
//#endregion
export { applyBookCopy as i, getBookPreviewForAdmin as n, saveBookPreview as r, getBookPreview as t };
