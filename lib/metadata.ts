import type { Metadata } from "next";
import { site } from "@/lib/site";
import { social } from "@/lib/social";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type: "website", siteName: site.name, images: [{ url: "/opengraph-image", ...social.imageSize, alt: social.imageAlt }] },
    twitter: { title: fullTitle, description },
  };
}
