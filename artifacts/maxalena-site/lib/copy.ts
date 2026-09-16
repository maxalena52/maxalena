const LOLA_OLD = [
  "Lola has a dirty mouth who isn't afraid to call out bullshit!",
  "Lola has a dirty mouth who isn’t afraid to call out bullshit!",
];

const LOLA_NEW =
  "Lola has a filthy mouth and no patience for bullshit. After the Grim Reaper accidentally kills her and she awakens inside the novel she hated most, she decides that living quietly is not an option. But the harder she fights the story, the more she begins to realise that she may not control its plot as completely as she believed.";

const CASSIUS_NEW =
  "Cassius Thornwood is the kingdom’s most dangerous Fixer—a hunter tasked with eradicating the witches he has been taught to regard as pests. His certainty begins to fracture when he encounters Grace, the only witch he fails to kill.";

export function cleanText(value?: string | null) {
  if (!value) return "";
  return value
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/the kingdoms most dangerous fixer/gi, "the kingdom’s most dangerous Fixer")
    .replace(/the only difference this is is that/gi, "the only difference is that")
    .trim();
}

export function characterPublicCopy(name: string, description?: string | null) {
  const n = name.trim();
  if (n.toLowerCase().startsWith("lola daffodil")) return LOLA_NEW;
  if (n.toLowerCase() === "cassius thornwood") return CASSIUS_NEW;
  let text = cleanText(description);
  if (LOLA_OLD.some((s) => text.includes(s))) return LOLA_NEW;
  if (text.includes("the only difference this is is")) {
    text = text.replace(
      /He is every bit the antagonist a novel hero needs, the only difference this is is that the hero he is antagonizing happens to be the woman he is slowly falling in love with\./i,
      "He is every bit the antagonist a novel hero needs—except the hero he is opposing is the woman he is slowly falling in love with."
    );
  }
  return text;
}

export function characterDisplayName(name: string) {
  if (name.toLowerCase().startsWith("lola daffodil")) return "Lola Daffodil";
  if (name.includes("Raphael Grimwraith")) return "Raphael Grimwraith";
  return name.trim();
}

export function inferGenre(title: string, tropes?: string[] | null, status?: string | null) {
  const blob = `${title} ${(tropes || []).join(" ")}`.toLowerCase();
  if (blob.includes("professor") || blob.includes("contemporary") || blob.includes("ceo") || blob.includes("corporate")) {
    return "Contemporary forbidden romance";
  }
  if (blob.includes("grim reaper") || blob.includes("mythology") || blob.includes("transmigrat")) {
    return "Dark fantasy romance";
  }
  if (blob.includes("witch") || blob.includes("dragon") || blob.includes("supernatural") || blob.includes("war")) {
    return "Romantasy";
  }
  if ((status || "").includes("ongoing")) return "Serialised romantasy";
  return "Dark romance";
}

export const DEFAULT_BIO =
  "Maxalena L. writes the love stories that fight hardest to exist—the forbidden ones, the dangerous ones, the ones that cost everything. Her work lives in the space between romance and fantasy, dark and light, hope and despair. Her heroes are flawed. Her heroines are fierce. Her worlds are lived-in and treacherous, and her love stories make no promises except to be unforgettable.";

export const DEFAULT_INTRO =
  "A storyteller who crafts dark romances and fantasy worlds so vivid that readers lose themselves completely. Every book is a descent into something beautiful and dangerous.";

export const DEFAULT_POSITIONING =
  "Where dark romance meets unforgettable worlds. Stories that pull you in and refuse to let go.";
