import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchSettings } from "@/lib/content";
import { legalReady } from "@/lib/legal";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchSettings().catch(() => ({}));
  const legal = legalReady(settings);
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer
        settings={settings}
        showLegal={{
          privacy: legal.privacy,
          terms: legal.terms,
          cookies: legal.cookies,
          copyright: legal.copyright,
        }}
      />
    </>
  );
}
