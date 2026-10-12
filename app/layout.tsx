import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { social } from "@/lib/social";
const display = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  title:
    "Agape Unlimited Foundation | Unlimited Love. Unlimited Possibilities.",
  description:
    "Empowering underserved children and families through education, mentorship, resources, and opportunities that strengthen communities.",
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Agape Unlimited Foundation",
    description: social.description,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: social.description,
    images: [{ url: "/opengraph-image", ...social.imageSize, alt: social.imageAlt }],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
