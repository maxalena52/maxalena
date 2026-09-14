import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reader = /\/books\/[^/]+\/preview\/?$/.test(pathname);
  return (
    <div className="site-wrap">
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      {!reader && <SiteFooter />}
    </div>
  );
}
