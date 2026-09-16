import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/urls";

export default function robots(): MetadataRoute.Robots {
  const url = siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
