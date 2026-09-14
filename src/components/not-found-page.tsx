import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function NotFoundPage() {
  return (
    <div className="site-bg min-h-screen">
      <div className="site-wrap">
        <SiteHeader />
        <main id="main" className="mx-auto max-w-2xl px-5 py-24 text-center">
          <p className="ornament mb-4">404</p>
          <h1 className="font-display text-5xl text-ivory">This page is not in the library</h1>
          <p className="mt-4 text-taupe">The volume you asked for is missing, unpublished, or never existed.</p>
          <Link to="/books" className="btn mt-8">
            Explore the Books
          </Link>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
