import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { QueryProvider } from "@/lib/query-provider";
import { AppErrorComponent } from "@/lib/error-component";
import appCss from "../styles.css?url";

const APP_NAME = "Maxalena L.";
const DESCRIPTION =
  "Official site of Maxalena L., author of dark romance, romantasy, gothic fiction, and emotionally intense serialised stories.";

export const Route = createRootRoute({
  errorComponent: AppErrorComponent,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maxalena L. | Dark Romance & Romantasy Author" },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#080808" },
      { name: "application-name", content: APP_NAME },
      { name: "author", content: APP_NAME },
      { property: "og:title", content: "MAXALENA | I write what you pretend not to read" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://maxalena.com/" },
      { property: "og:image", content: "https://maxalena.com/og.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MAXALENA | I write what you pretend not to read" },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "https://maxalena.com/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Great+Vibes&family=Nunito:wght@500;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap",
      },
      { rel: "canonical", href: "https://maxalena.com/" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en-GB" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="site-bg min-h-screen bg-obsidian text-ivory">
        <PreviewHostBridge />
        <AuthProvider>
          <QueryProvider>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Outlet />
          </QueryProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
