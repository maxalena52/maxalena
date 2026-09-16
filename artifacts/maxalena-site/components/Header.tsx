"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/characters", label: "Characters" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
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

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(198,161,91,0.14)] bg-[rgba(8,8,8,0.92)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-3 no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl tracking-[0.08em] text-[var(--ivory)]">
            Maxalena L.
          </span>
        </Link>

        <nav className="font-ui hidden items-center gap-8 text-[0.78rem] tracking-[0.18em] uppercase md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                active(item.href)
                  ? "text-[var(--gold)] border-b border-[var(--gold)] pb-1 no-underline"
                  : "text-[var(--taupe)] hover:text-[var(--ivory)] no-underline"
              }
            >
              {item.label}
            </Link>
          ))}
          <Link href="/books" className="btn !min-h-9 !px-4 !text-[0.68rem]">
            Explore Books
          </Link>
        </nav>

        <button
          type="button"
          className="font-ui md:hidden border border-[rgba(198,161,91,0.4)] px-3 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-[var(--parchment)]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-[rgba(198,161,91,0.14)] bg-[#0b0a09] px-5 py-6"
        >
          <nav className="flex flex-col gap-4 font-ui text-sm tracking-[0.16em] uppercase" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={active(item.href) ? "text-[var(--gold)]" : "text-[var(--parchment)]"}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/books" className="btn mt-2 w-fit">
              Explore Books
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
