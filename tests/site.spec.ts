import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("social metadata points to a valid branded PNG", async ({ page, request }) => {
  await page.goto("/");
  const imageUrl = new URL(
    (await page.locator('meta[property="og:image"]').getAttribute("content"))!,
  );
  expect(imageUrl.protocol).toBe("https:");
  expect(imageUrl.hostname).not.toBe("localhost");
  expect(imageUrl.pathname).toBe("/opengraph-image");
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content", "1200",
  );
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
    "content", "630",
  );
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
    "content", /Agape Unlimited Foundation/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content", "summary_large_image",
  );
  const twitterUrl = new URL(
    (await page.locator('meta[name="twitter:image"]').getAttribute("content"))!,
  );
  expect(twitterUrl.origin).toBe(imageUrl.origin);
  expect(twitterUrl.pathname).toBe(imageUrl.pathname);

  // Check the tested deployment, even when its canonical URL is different.
  const response = await request.get(imageUrl.pathname + imageUrl.search);
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("image/png");
  const png = await response.body();
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
  expect(png.length).toBeLessThan(5 * 1024 * 1024);
});

test("desktop content, program filtering, accessibility and assets", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Unlimited love.",
  );
  await expect(page.locator(".program")).toHaveCount(10);
  await page
    .getByRole("button", { name: "Children & youth", exact: true })
    .click();
  await expect(page.locator(".program")).toHaveCount(4);
  await page.getByText("Youth mentorship", { exact: true }).click();
  await expect(
    page.getByText("Building caring connections", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "All areas", exact: true }).click();
  await expect(page.locator(".program")).toHaveCount(10);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (el) =>
            (el as HTMLImageElement).complete &&
            (el as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBeTruthy();
  }
  const images = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.every(
        (i) =>
          (i as HTMLImageElement).complete &&
          (i as HTMLImageElement).naturalWidth > 0,
      ),
    );
  expect(images).toBeTruthy();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
});
test("mobile menu, focus return, layout and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "What we do" })
    .click();
  await expect(page).toHaveURL(/\/programs$/);
  // The URL changes before Next finishes loading the destination metadata.
  await expect(page).toHaveTitle("Our programs | Agape Unlimited Foundation");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Many ways to care.");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  expect(
    await page
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (el) =>
            (el as HTMLImageElement).complete &&
            (el as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBeTruthy();
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
});
