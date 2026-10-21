import type { MetadataRoute } from "next";
import { canonicalUrl, publishedPages } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // No synthetic lastmod: a build date does not establish a content update.
  return publishedPages.map(({ path }) => ({ url: canonicalUrl(path) }));
}
