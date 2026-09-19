import type { SiteSettings } from "./types";

export function legalReady(settings: SiteSettings) {
  const hasJurisdiction = Boolean(settings.legal_jurisdiction?.trim());
  const hasHosting = Boolean(settings.hosting_provider?.trim());
  const analyticsOn = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  return {
    privacy: true,
    terms: true,
    cookies: analyticsOn || Boolean(settings.cookie_policy?.trim()),
    copyright: true,
    affiliate: Boolean(settings.affiliate_disclosure?.trim()),
    jurisdiction: settings.legal_jurisdiction?.trim() || null,
    legalName: settings.legal_name?.trim() || "Maxalena L.",
    hosting: settings.hosting_provider?.trim() || "Vercel and Supabase",
    analytics: analyticsOn ? "Google Analytics" : settings.analytics_provider?.trim() || null,
    contactMethod: settings.legal_contact_method?.trim() || null,
    adminIncomplete: !hasJurisdiction || !hasHosting,
  };
}
