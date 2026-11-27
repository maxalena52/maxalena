import type { Book } from "./types";

type Copy = Pick<Book, "blurb" | "synopsis" | "trigger_warnings"> & { title?: string };

const COPY: Record<string, Copy> = {
  "the-dragon-commanders-captive": {
    title: "The Dragon Commander's Captive",
    blurb:
      "She is the enemy doctor forced to heal his army. He is the Dragon Commander who should guard her—but has fallen too deeply to ever let her go.",
    synopsis:
      "Taken prisoner by enemy forces, a gifted doctor is forced to use her skills to keep their soldiers alive. Overseeing her is the feared Dragon Commander, a man tasked with watching her every move and ensuring she never escapes.\n\nBut somewhere between midnight treatments, battlefield wounds and bitter confrontations, vigilance becomes devotion. He cannot release her without betraying his army, yet keeping her means remaining the jailer of the woman he loves.\n\nShe insists that whatever she feels for him is merely the confusion of captivity. With the war sharpening every divided loyalty, she must decide whether loving her enemy is another kind of prison—and he must choose between keeping her beside him and becoming a man worthy of her trust.",
    trigger_warnings: [
      "War",
      "Imprisonment",
      "Power imbalance",
      "Violence",
      "Blood",
      "Medical injury",
      "Mature themes",
    ],
  },
  "blood-covenant": {
    blurb:
      "He was sent to kill the last blood witch. One accidental covenant made her death his own—and turned her hunter into her shield.",
    synopsis:
      "Cassius is the kingdom's most feared Fixer, a ruthless hunter sent to eliminate creatures considered dangerous. Grace is the last blood witch, condemned to die simply for what she is.\n\nOne sword cut and one shared drop of blood awaken an ancient covenant. Now, if one of them dies, they both die—and they cannot move more than a mile apart.\n\nForced into each other's lives, hatred becomes reluctant dependence, dangerous desire and eventually a love neither of them was meant to survive. But the covenant only prevents Cassius from killing Grace. It cannot erase what he was, what her kind suffered, or the people still demanding her death.\n\nWhen the hunter becomes the hunted woman's fiercest protector, they must discover whether love can survive the forces determined to tear them apart.",
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
      "18+ (Smut)",
    ],
  },
  "office-hours": {
    blurb: "He chose his student as an instrument of revenge. He never intended to become obsessed with her.",
    synopsis:
      "At twenty-two, provocative and sharp-witted postgraduate student Reina Chen refuses to be intimidated by Professor Finn Kane, the brilliant forty-year-old academic who continually singles her out in class.\n\nTheir intellectual battles become private confrontations, and those confrontations ignite a forbidden affair built on manipulation, challenge and dangerous chemistry.\n\nBut Finn's interest in Reina was never accidental. She is the daughter of the man connected to the betrayal that destroyed his family, and getting close to her was supposed to be revenge.\n\nThe problem is that Finn falls first—and far harder than he planned. With mutual blackmail, university rules, family secrets and betrayal closing around them, Reina must determine whether anything between them was real, while Finn must decide whether revenge is worth losing the woman he can no longer treat as a pawn.",
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
      "18+ (Smut)",
    ],
  },
  "ceo-s-hostile-take-over": {
    blurb:
      "Publicly discarded by the man she helped build, Ariadne accepts a ruthless CEO's offer of revenge—only to become the one acquisition he refuses to surrender.",
    synopsis:
      'Ariadne Hector spent years standing beside her boyfriend, only for him to humiliate her publicly and dismiss her as "just the secretary."\n\nThen Henry Zevelle—his forty-eight-year-old uncle and a notoriously ruthless CEO—offers her an exclusive-companion contract with one purpose: help him destroy his nephew\'s career.\n\nAriadne enters the bargain seeking revenge. Henry gives her the power and opportunity to become more than the woman his nephew discarded, transforming her from an overlooked secretary into a formidable executive.\n\nBut calculated seduction becomes obsession, and corporate warfare turns brutally personal. As Henry begins publicly claiming the woman his nephew underestimated, Ariadne must decide whether she is using the CEO\'s power to seize her future—or becoming the final prize in his hostile takeover.',
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
      "18+ (Smut)",
    ],
  },
  "the-emperors-black-widow": {
    blurb: "She was sent to ruin his kingdom. Instead, she became the one temptation he could not afford.",
    synopsis:
      "Azma Athanasios has earned many names throughout her life, few of them spoken with affection. Beautiful, dangerous, and burdened by a reputation that precedes her, the princess of Athanasios is accustomed to being used as an instrument of her father's ambition.\n\nWhen King Dragna sends her to the Kingdom of Ophir as the sovereign's mistress, her instructions are deceptively simple: seduce Crown Prince Leander, compromise the royal household, and lay the foundations for Ophir's downfall.\n\nThere is only one complication.\n\nHelios Constantine.\n\nScarred, reclusive, and feared by those who scarcely know him, Helios is a man whose silence inspires more unease than another man's fury. He has little interest in entertaining a foreign princess, particularly when he already has a royal fiancée and a kingdom demanding his attention.\n\nYet Azma finds herself increasingly fascinated by the man she was never instructed to desire.\n\nAmid imperial conspiracies, delicate alliances, dangerous secrets, and the growing attention of the crown prince, Azma must decide whether she will remain the weapon her father fashioned or become something far more dangerous: a woman acting entirely of her own accord.\n\nBut defying a king comes at a price. Loving one may cost considerably more.\n\nAnd neither Azma nor Helios can afford to forget that the most devastating betrayals rarely begin with hatred.",
    tropes: [
      "Slow-burn romance",
      "Forbidden desire",
      "Morally grey heroine",
      "Scarred male lead",
      "Political intrigue",
      "Royal mistress",
      "Divided loyalties",
      "Dangerous attraction",
      "Touch her and die",
      "Powerful female lead",
      "Protective male lead",
      "Court conspiracies",
      "Mutual yearning",
      "Conflicting allegiances",
      "Love versus duty",
      "Emotional intimacy",
    ],
    trigger_warnings: [
      "Explicit sexual content",
      "Sensual intimacy",
      "Political manipulation",
      "Violence",
      "Warfare",
      "Death and loss",
      "Abusive family dynamics",
      "Morally complex characters",
      "Unequal power structures",
      "18+",
    ],
  },
  "grim-reaper-chaos": {
    blurb:
      "She died by his hand, woke inside a doomed romance novel—and accidentally trapped Death himself inside it with her.",
    synopsis:
      "Lola was an ordinary modern woman until she awakened inside a tragic romance novel, occupying the body of a temporary character the story considered disposable.\n\nUnfortunately, the novel's immortal duke, Raphael Grimwraith, is also the living Grim Reaper—and he has already killed her once by accident.\n\nNow they are both trapped inside a story determined to end in tragedy. Lola wants to escape the novel before it kills her again. Raphael wants to understand how one impossible woman managed to alter his eternal existence.\n\nTheir combative alliance soon becomes dangerously intimate. Between cheating princes, murderous court schemes and homicidal shadow creatures, Lola must survive a plot written to discard her, while Raphael confronts the one thing immortality never prepared him for: the possibility of losing her.\n\nBut rewriting fate always demands a price—and Death has never been known for letting anyone leave empty-handed.",
    trigger_warnings: [
      "Accidental death",
      "Death themes",
      "Violence",
      "Supernatural danger",
      "Shadow monsters",
      "Infidelity",
      "Coercive dynamics",
      "Explicit sexual content",
      "Mature themes 18+ (Smut)",
    ],
  },
};

const TITLES: Record<string, string> = {
  "blood-covenant": "Blood Covenant",
  "office-hours": "Office Hours",
  "ceo-s-hostile-take-over": "The CEO's Hostile Takeover",
  "grim-reaper-chaos": "Transmigrated into a Novel and Trapped the Grim Reaper",
  "the-dragon-commanders-captive": "The Dragon Commander's Captive",
  "the-emperors-black-widow": "The Emperor's Black Widow",
  "the-algorithm-of-vengeance": "The Algorithm of Vengeance",
};

const COVERS: Record<string, string> = {
  "blood-covenant": "/covers/blood-covenant.jpg",
  "office-hours": "/covers/office-hours.jpg",
  "ceo-s-hostile-take-over": "/covers/ceo-s-hostile-take-over.jpg",
  "grim-reaper-chaos": "/covers/grim-reaper-chaos.png",
  "the-dragon-commanders-captive": "/covers/the-dragon-commanders-captive.jpg",
  "the-emperors-black-widow": "/covers/the-emperors-black-widow.jpg",
  "the-algorithm-of-vengeance": "/covers/the-algorithm-of-vengeance.jpg",
};

export function catalogBooks(): Book[] {
  return Object.keys(COVERS).map((slug, index) =>
    applyBookCopy({
      id: slug,
      title: TITLES[slug] || slug,
      slug,
      cover_url: COVERS[slug],
      blurb: null,
      synopsis: null,
      tropes: null,
      trigger_warnings: null,
      status: "published",
      category: null,
      order_index: index,
      purchase_links: null,
      sample_chapter: null,
      character_art_urls: null,
    }),
  );
}

export function shelfBooks(live: Book[]): Book[] {
  const map = new Map<string, Book>();
  for (const book of catalogBooks()) map.set(book.slug, book);
  for (const book of live) {
    const base = map.get(book.slug);
    map.set(
      book.slug,
      applyBookCopy({
        ...(base || {}),
        ...book,
        title: book.title || base?.title || book.slug,
        cover_url: book.cover_url || base?.cover_url || null,
        blurb: book.blurb || base?.blurb || null,
        synopsis: book.synopsis || base?.synopsis || null,
        tropes: book.tropes?.length ? book.tropes : base?.tropes || null,
        trigger_warnings: book.trigger_warnings?.length ? book.trigger_warnings : base?.trigger_warnings || null,
      }),
    );
  }
  return [...map.values()];
}

export function applyBookCopy<T extends Pick<Book, "slug"> & Partial<Book>>(book: T): T {
  const extra = COPY[book.slug];
  return extra ? { ...book, ...extra } : book;
}

export type StoryLead = { name: string; role: string; bio: string };

export type StoryPage = {
  tagline: string;
  short: string[];
  genres: string[];
  facts: { label: string; value: string }[];
  notes: string;
  excerpt: string[];
  leads: StoryLead[];
  ratings: { label: string; value: string }[];
  recommended: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
};

const PAGES: Record<string, StoryPage> = {
  "the-emperors-black-widow": {
    tagline: "She was sent to ruin his kingdom. Instead, she became the one temptation he could not afford.",
    short: [
      "She was sent to become his mistress. Her true assignment was to seduce his crown prince and bring his kingdom to its knees.",
      "But the scarred sovereign of Ophir is nothing like the monster she was promised, and Azma Athanasios has never been particularly obedient.",
      "In a court where affection is a liability and desire can ruin dynasties, falling for the wrong man might be her most dangerous act of defiance.",
    ],
    genres: ["Dark Romance", "Romantasy", "Imperial Fantasy", "Political Intrigue"],
    facts: [
      { label: "Author", value: "Maxalena L." },
      { label: "Format", value: "Webnovel / Serial" },
      { label: "Audience", value: "Mature readers (18+)" },
      { label: "Setting", value: "The Kingdom of Ophir" },
      { label: "Female lead", value: "Azma Athanasios" },
      { label: "Male lead", value: "Helios Constantine" },
      { label: "Universe", value: "Imperial Romance" },
    ],
    notes:
      "The Emperor's Black Widow contains explicit sexual content, sensual intimacy, political manipulation, violence, warfare, references to death and loss, abusive family dynamics, morally complex characters, and depictions of unequal power structures. The narrative explores mature and potentially uncomfortable themes within a fictional setting. Reader discretion is advised.",
    excerpt: [
      "“Your father must think very little of me if he believes a beautiful woman is all it takes to bring Ophir to its knees.”",
      "Azma smiled, lifting her gaze to meet his.",
      "“Perhaps, Your Grace, he thinks very highly of me.”",
      "For the first time that evening, Helios looked genuinely amused.",
      "“And what do you think, Princess?”",
      "She allowed her eyes to linger upon his scar before returning to those impossibly green eyes.",
      "“I think my father and I have very different ideas about what constitutes a successful evening.”",
    ],
    leads: [
      {
        name: "Azma Athanasios",
        role: "The Black Widow",
        bio: "A princess with a dangerous reputation, an inconvenient conscience, and an extraordinary talent for making powerful men uncomfortable. She knows what it means to be somebody else's weapon. She is beginning to discover what it means to wield her own power.",
      },
      {
        name: "Helios Constantine",
        role: "The Scarred Sovereign",
        bio: "A formidable ruler whose reputation is built upon silence, military prowess, and the mysteries surrounding his past. He has survived wars and political treachery. An unpredictable foreign princess, however, presents an entirely different problem.",
      },
    ],
    ratings: [
      { label: "Romance intensity", value: "5/5" },
      { label: "Romantic pacing", value: "Slow burn" },
      { label: "Political intrigue", value: "5/5" },
      { label: "Darkness", value: "4/5" },
      { label: "Sensuality", value: "Explicit" },
      { label: "Narrative style", value: "Character-driven, political and romantic" },
    ],
    recommended: "Readers who enjoy dangerous court politics, intelligent heroines, powerful men and forbidden romance.",
    metaTitle: "The Emperor's Black Widow | Dark Romantasy by Maxalena L.",
    metaDescription:
      "A dangerous princess, a scarred sovereign, and a secret assignment that threatens an entire kingdom. Discover The Emperor's Black Widow, a seductive political romantasy by Maxalena L.",
    keywords:
      "Dark romance webnovel, imperial romance, mature romantasy, scarred emperor romance, royal mistress romance, forbidden romance, political fantasy, morally grey heroine, slow-burn romance",
  },
};

export function storyPage(slug: string) {
  return PAGES[slug] || null;
}
