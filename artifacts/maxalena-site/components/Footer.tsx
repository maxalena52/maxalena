import Link from "next/link";
import { authorCopy, socialLinks } from "@/lib/content";
import type { SiteSettings } from "@/lib/types";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/characters", label: "Characters" },
  { href: "/about", label: "About" },
];

export default function Footer({
  settings,
  showLegal,
}: {
  settings: SiteSettings;
  showLegal: { privacy: boolean; terms: boolean; cookies: boolean; copyright: boolean };
}) {
  const copy = authorCopy(settings);
  const socials = socialLinks(settings);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[rgba(198,161,91,0.16)] bg-[#0b0a09]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-[var(--ivory)]">Maxalena L.</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--taupe)]">{copy.positioning}</p>
        </div>
        <div>
          <p className="ornament !justify-start mb-4">Navigate</p>
          <ul className="font-ui space-y-2 text-sm tracking-wide text-[var(--parchment)]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            {showLegal.privacy && (
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            )}
            {showLegal.terms && (
              <li>
                <Link href="/terms">Terms of Use</Link>
              </li>
            )}
            {showLegal.cookies && (
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
            )}
            {showLegal.copyright && (
              <li>
                <Link href="/copyright">Copyright and Takedown</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          {socials.length > 0 && (
            <>
              <p className="ornament !justify-start mb-4">Connect</p>
              <ul className="font-ui space-y-2 text-sm text-[var(--parchment)]">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="gold-rule" />
      <p className="px-5 py-6 text-center text-xs tracking-wide text-[var(--taupe)]">
        © {year} Maxalena L. All rights reserved.
      </p>
    </footer>
  );
}
