import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./resources.css";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getPosts } from "@/lib/cms";
export const dynamic = "force-dynamic";
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
  metadataBase: new URL(site.url),
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hasPublishedResources = (await getPosts()).length > 0;
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header showResources={hasPublishedResources} />
        {children}
        <Footer showResources={hasPublishedResources} />
      </body>
    </html>
  );
}
