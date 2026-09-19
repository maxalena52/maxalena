import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Serif_4, Outfit } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/urls";
import Script from "next/script";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const ui = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ui",
});

const url = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "Maxalena L. | Dark Romance & Romantasy Author",
    template: "%s",
  },
  description:
    "Official site of Maxalena L., author of dark romance, romantasy, gothic fiction, and emotionally intense serialised stories.",
  applicationName: "Maxalena L.",
  authors: [{ name: "Maxalena L.", url }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url,
    siteName: "Maxalena L.",
    title: "Maxalena L. | Dark Romance & Romantasy Author",
    description:
      "Dark romance. Fantasy worlds. Characters that haunt you long after the final page.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Maxalena L." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxalena L. | Dark Romance & Romantasy Author",
    description:
      "Dark romance. Fantasy worlds. Characters that haunt you long after the final page.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en-GB">
      <body className={`${display.variable} ${body.variable} ${ui.variable} antialiased`}>
        <a href="#main" className="skip-link font-ui">
          Skip to content
        </a>
        <div className="site-wrap">{children}</div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Maxalena L.",
              url,
              author: { "@type": "Person", name: "Maxalena L.", url },
            }),
          }}
        />
        {ga ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
