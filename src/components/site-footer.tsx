import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-4 pb-8 pt-2">
      <p className="text-center font-display text-2xl font-semibold text-[#ffe9b0] md:text-3xl">
        Come wander through worlds built from colour, chaos, longing, and light.
      </p>
      <div className="mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-pink-100/70">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/copyright">Copyright</Link>
        <Link to="/admin/login">Author desk</Link>
        <span>© {year} Maxalena L.</span>
      </div>
    </footer>
  );
}
