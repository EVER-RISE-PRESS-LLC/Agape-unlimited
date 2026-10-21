import { test, expect } from "@playwright/test";

const corePages = ["/", "/about", "/programs", "/values", "/get-involved", "/contact", "/donate", "/privacy"];

test("discovery files list reachable canonical pages without drafts or API URLs", async ({ page, request }) => {
  await page.goto("/");
  const homeCanonical = (await page.locator('link[rel="canonical"]').getAttribute("href"))!;
  const origin = new URL(homeCanonical).origin;
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("xml");
  const parsed = await page.evaluate((xml) => {
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    return {
      error: doc.querySelector("parsererror")?.textContent ?? null,
      namespace: doc.documentElement.namespaceURI,
      urls: Array.from(doc.querySelectorAll("url > loc"), (node) => node.textContent!),
    };
  }, await sitemap.text());
  expect(parsed.error).toBeNull();
  expect(parsed.namespace).toBe("http://www.sitemaps.org/schemas/sitemap/0.9");
  expect(new Set(parsed.urls).size).toBe(parsed.urls.length);
  expect(parsed.urls.map((url) => new URL(url).pathname)).toEqual(expect.arrayContaining(corePages));
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const url of parsed.urls) {
    const canonical = new URL(url);
    expect(canonical.origin).toBe(origin);
    expect(canonical.protocol).toBe("https:");
    expect(canonical.search).toBe("");
    expect(canonical.hash).toBe("");
    expect(canonical.pathname).not.toMatch(/api|404|_not-found|draft|SEO|\.md/);
    expect((await page.goto(canonical.pathname))?.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", url);
    await expect(page.locator("h1")).toHaveCount(1);
    const title = await page.title();
    const description = (await page.locator('meta[name="description"]').getAttribute("content"))!;
    expect(title.length).toBeGreaterThan(0);
    expect(description.length).toBeGreaterThan(0);
    expect(titles.has(title)).toBe(false);
    expect(descriptions.has(description)).toBe(false);
    titles.add(title);
    descriptions.add(description);
    const robots = await page.locator('meta[name="robots"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content") ?? ""));
    expect(robots.join(" ")).not.toContain("noindex");
  }
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  const rules = await robots.text();
  expect(rules).toMatch(/User-Agent: \*/i);
  expect(rules).toMatch(/^Allow: \/$/m);
  expect(rules).toContain(`Sitemap: ${origin}/sitemap.xml`);
  expect(rules).not.toMatch(/^Disallow: \/\s*$/m);
});

test("organization data uses the real identity and breadcrumb data matches visible navigation", async ({ page, request }) => {
  await page.goto("/");
  const canonical = (await page.locator('link[rel="canonical"]').getAttribute("href"))!;
  const graph = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  expect(graph["@context"]).toBe("https://schema.org");
  const organization = graph["@graph"].find((node: Record<string, unknown>) => node["@type"] === "Organization");
  const website = graph["@graph"].find((node: Record<string, unknown>) => node["@type"] === "WebSite");
  expect(organization).toMatchObject({ name: "Agape Unlimited Foundation", url: canonical });
  expect(organization.description).toBe(await page.locator('meta[name="description"]').getAttribute("content"));
  expect(website).toMatchObject({ name: organization.name, url: canonical, publisher: { "@id": organization["@id"] } });
  expect(website.potentialAction).toBeUndefined();
  const logo = new URL(organization.logo);
  expect(logo.origin).toBe(new URL(canonical).origin);
  const logoResponse = await request.get(logo.pathname);
  expect(logoResponse.status()).toBe(200);
  expect(logoResponse.headers()["content-type"]).toContain("image/png");

  for (const path of corePages.slice(1)) {
    await page.goto(path);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(2);
    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb", exact: true });
    const label = await breadcrumb.locator('[aria-current="page"]').textContent();
    expect(data.itemListElement[0]).toMatchObject({ position: 1, name: "Home", item: canonical });
    expect(data.itemListElement[1]).toMatchObject({ position: 2, name: label, item: new URL(path, canonical).href });
  }
});

test("error, query and API metadata preserve correct crawl behavior and private files stay unavailable", async ({ page, request }) => {
  await page.goto("/contact?topic=volunteering&utm_source=seo-check");
  const canonical = (await page.locator('link[rel="canonical"]').getAttribute("href"))!;
  expect(new URL(canonical).pathname).toBe("/contact");
  expect(new URL(canonical).search).toBe("");
  const missing = await page.goto("/seo-check-missing-page");
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle("Page not found | Agape Unlimited Foundation");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /This page could not be found/);
  const availability = await request.get("/api/contact");
  expect(availability.status()).toBe(200);
  expect(availability.headers()["x-robots-tag"]).toBe("noindex");
  expect(availability.headers()["cache-control"]).toBe("no-store");
  expect(await availability.json()).toEqual({ available: false });
  for (const path of ["/AGENTS.md", "/NEEDS-YOUR-REVIEW.md", "/SUPERADMIN-SETUP.md", "/SEO/README.md", "/.env", "/admin", "/admin/create-first-user", "/api/users", "/api/pages", "/resources", "/preview/pages/1"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test("published links resolve and fingerprinted assets have an immutable cache policy", async ({ page, request }) => {
  const destinations = new Set<string>();
  for (const path of corePages) {
    await page.goto(path);
    const links = await page.locator('a[href^="/"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!));
    for (const link of links) destinations.add(new URL(link, "https://example.test").pathname);
    const anchors = await page.locator('a[href^="#"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!.slice(1)).filter(Boolean));
    for (const id of anchors) {
      expect(await page.evaluate((target) => document.getElementById(target) !== null, decodeURIComponent(id))).toBe(true);
    }
  }
  for (const path of destinations) expect((await request.get(path)).status()).toBe(200);
  const script = await page.locator('script[src^="/_next/static/"]').first().getAttribute("src");
  expect(script).toBeTruthy();
  const asset = await request.get(script!);
  expect(asset.status()).toBe(200);
  expect(asset.headers()["cache-control"]).toContain("max-age=31536000");
  expect(asset.headers()["cache-control"]).toContain("immutable");
});
