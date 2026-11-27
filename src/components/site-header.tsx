import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Stories" },
  { to: "/characters", label: "Universes" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function search(e: React.FormEvent) {
    e.preventDefault();
    void navigate({ to: "/books" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-pink-400/40 bg-[#1a0630]/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-3 py-2.5 md:px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 no-underline">
          <img
            src="/author-portrait.jpg"
            alt=""
            className="h-9 w-9 rounded-full border border-[#ffe27a]/70 object-cover object-center"
          />
          <span className="font-display text-xl font-semibold tracking-wide text-[#ffe27a]">maxalena.com</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const on = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
            const home = item.label === "Home" && pathname === "/";
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-semibold no-underline",
                  home
                    ? "bg-[#ff4db8] text-white shadow-[0_0_14px_#ff4db8]"
                    : on
                      ? "text-[#ffe27a]"
                      : "text-white/90 hover:text-[#ffe27a]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form onSubmit={search} className="ml-auto hidden items-center md:flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search MAXALENA..."
            aria-label="Search stories"
            className="w-40 rounded-full border border-pink-300/50 bg-[#2a0a40]/80 px-3 py-1.5 text-xs text-white outline-none placeholder:text-pink-100/50 lg:w-48"
          />
        </form>
        <button
          type="button"
          className="ml-auto rounded-full border border-pink-300/60 px-3 py-1.5 text-xs text-white lg:hidden"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-2 border-t border-pink-400/30 px-4 py-4 lg:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.label} to={item.to} className="text-white no-underline">
              {item.label}
            </Link>
          ))}
          <form onSubmit={search}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search MAXALENA..."
              className="mt-2 w-full rounded-full border border-pink-300/50 bg-[#2a0a40] px-3 py-2 text-sm text-white"
            />
          </form>
        </nav>
      )}
    </header>
  );
}
