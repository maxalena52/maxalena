import { Link } from "@tanstack/react-router";
import { authorCopy, socialLinks } from "@/lib/content";
import { useSettings } from "@/lib/use-library";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Books" },
  { to: "/characters", label: "Characters" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const { data: settings = {} } = useSettings();
  const copy = authorCopy(settings);
  const socials = socialLinks(settings);
  const year = new Date().getFullYear();
  const showCookies = Boolean(settings.analytics_enabled === "true" || settings.cookie_policy?.trim());

  return (
    <footer className="mt-24 border-t border-gold/16 bg-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-ivory">Maxalena L.</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-taupe">{copy.positioning}</p>
        </div>
        <div>
          <p className="ornament mb-4 !justify-start">Navigate</p>
          <ul className="font-ui space-y-2 text-sm tracking-wide text-parchment">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Use</Link>
            </li>
            {showCookies && (
              <li>
                <Link to="/cookies">Cookie Policy</Link>
              </li>
            )}
            <li>
              <Link to="/copyright">Copyright and Takedown</Link>
            </li>
          </ul>
        </div>
        <div>
          {socials.length > 0 && (
            <>
              <p className="ornament mb-4 !justify-start">Connect</p>
              <ul className="font-ui space-y-2 text-sm text-parchment">
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
      <p className="px-5 py-6 text-center text-xs tracking-wide text-taupe">© {year} Maxalena L. All rights reserved.</p>
    </footer>
  );
}
