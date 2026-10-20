import { site } from "@/lib/site";

// Add a page only once it exists, is intended to be indexed, and is published.
export const publishedPages = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About us" },
  { path: "/programs", name: "Our programs" },
  { path: "/values", name: "Our values" },
  { path: "/get-involved", name: "Get involved" },
  { path: "/contact", name: "Contact" },
  { path: "/donate", name: "Donate" },
  { path: "/privacy", name: "Privacy" },
] as const;

export function canonicalUrl(path: string) {
  return path === "/" ? site.url : new URL(path, `${site.url}/`).href;
}

export const organizationGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      description: site.description,
      areaServed: {
        "@type": "State",
        name: "Georgia",
        containedInPlace: { "@type": "Country", name: "United States" },
      },
      url: site.url,
      logo: canonicalUrl("/images/agape-seal-186.png"),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};
