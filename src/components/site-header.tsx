import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Books" },
  { to: "/characters", label: "Characters" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-obsidian/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src="/brand-mark.png" alt="" className="h-10 w-10 object-contain" width={40} height={40} />
          <span className="font-display text-xl tracking-[0.08em] text-ivory">Maxalena L.</span>
        </Link>

        <nav className="font-ui hidden items-center gap-8 text-[0.78rem] tracking-[0.18em] uppercase md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "pb-1 no-underline",
                active(item.to) ? "border-b border-gold text-gold" : "text-taupe hover:text-ivory",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/books" className="btn !min-h-9 !px-4 !text-[0.68rem]">
            Explore Books
          </Link>
        </nav>

        <button
          type="button"
          className="font-ui border border-gold/40 px-3 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-parchment md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-gold/15 bg-soft px-5 py-6 md:hidden">
          <nav className="font-ui flex flex-col gap-4 text-sm tracking-[0.16em] uppercase" aria-label="Mobile">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className={active(item.to) ? "text-gold" : "text-parchment"}>
                {item.label}
              </Link>
            ))}
            <Link to="/books" className="btn mt-2 w-fit">
              Explore Books
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
