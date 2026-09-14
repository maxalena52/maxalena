const PLACEHOLDER = new Set(["", "#", "/", "undefined", "null"]);

export function isValidHttpUrl(value?: string | null): value is string {
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

export function normaliseStatus(status?: string | null, category?: string | null) {
  const raw = (status || category || "").toLowerCase().replace(/\s+/g, "_");
  if (raw.includes("coming")) return "coming_soon" as const;
  if (raw.includes("ongoing") || raw.includes("serial")) return "ongoing" as const;
  return "published" as const;
}

export function statusLabel(status?: string | null, category?: string | null) {
  const s = normaliseStatus(status, category);
  if (s === "coming_soon") return "Coming Soon";
  if (s === "ongoing") return "Ongoing Serial";
  return "Published";
}
