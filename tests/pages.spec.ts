import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  ["/about", "Care is where"],
  ["/programs", "Many ways to care"],
  ["/values", "Love without limits"],
  ["/get-involved", "There’s a place for you"],
  ["/contact", "Good things begin"],
  ["/donate", "Give with love"],
  ["/privacy", "Your message, handled with care"],
] as const;

for (const width of [1440, 390]) {
  test(`interior pages: navigation, metadata, accessibility, and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const [path, heading] of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", new RegExp(`${path}$`));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      if (path === "/contact" || path === "/donate" || path === "/about") {
        await page.screenshot({ path: `test-results/${path.slice(1)}-${width}.png`, fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}

test("navigation reaches real pages and highlights the active page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Our mission" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Our mission" })).toHaveAttribute("aria-current", "page");
  await page.locator(".header-cta").click();
  await expect(page).toHaveURL(/\/donate$/);
  await page.getByRole("link", { name: "Talk to us about giving", exact: true }).click();
  await expect(page).toHaveURL(/\/contact\?topic=donation$/);
  await expect(page.getByLabel("What would you like to talk about?")).toHaveValue("donation");
  await expect(page.getByText("Message delivery is being set up.", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
});

test("contact form validates, preserves failed messages, and confirms only successful submission", async ({ page }) => {
  let submissions = 0;
  let payload: Record<string, unknown> = {};
  let successful = false;
  await page.route("**/api/contact", async route => {
    if (route.request().method() === "GET") return route.fulfill({ json: { available: true } });
    submissions++;
    payload = route.request().postDataJSON();
    return route.fulfill(successful ? { json: { ok: true } } : { status: 502, json: { error: "Your message couldn’t be sent. Please try again in a moment." } });
  });
  await page.goto("/contact?topic=volunteering");
  await expect(page.getByLabel("What would you like to talk about?")).toHaveValue("volunteering");
  await page.getByRole("button", { name: "Send message" }).click();
  expect(submissions).toBe(0);
  await page.getByLabel("Your name", { exact: false }).fill("Example Volunteer");
  await page.getByLabel("Email address", { exact: false }).fill("volunteer@example.com");
  await page.getByLabel("Organization", { exact: false }).fill("Example Community Group");
  await page.getByLabel("Your message", { exact: false }).fill("I would like to explore opportunities to volunteer my time.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Your message couldn’t be sent" })).toBeVisible();
  await expect(page.getByLabel("Your message", { exact: false })).toHaveValue("I would like to explore opportunities to volunteer my time.");
  await expect(page.getByText("Thank you for reaching out.")).toHaveCount(0);
  expect(payload).toMatchObject({ name: "Example Volunteer", email: "volunteer@example.com", organization: "Example Community Group", topic: "volunteering", consent: true, website: "" });
  successful = true;
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("Your message has been submitted");
  await expect(page.getByRole("status")).toBeFocused();
  await page.getByRole("button", { name: "Send another message" }).click();
  await expect(page.getByLabel("Your name", { exact: false })).toHaveValue("");
  await expect(page.getByLabel("Your name", { exact: false })).toBeFocused();
  expect(submissions).toBe(2);
});

test("contact connection errors can be retried without losing the form", async ({ page }) => {
  let available = false;
  await page.route("**/api/contact", route => available ? route.fulfill({ json: { available: true } }) : route.fulfill({ status: 503, json: { error: "Temporarily unavailable" } }));
  await page.goto("/contact");
  await expect(page.getByText("We couldn’t connect to message delivery.", { exact: false })).toBeVisible();
  await page.getByLabel("Your name", { exact: false }).fill("Example Visitor");
  available = true;
  await page.getByRole("button", { name: "Try connecting again" }).click();
  await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
  await expect(page.getByLabel("Your name", { exact: false })).toHaveValue("Example Visitor");
});

test("missing page provides a useful route home", async ({ page }) => {
  const response = await page.goto("/a-page-that-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Let’s find your way back");
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/\/$/);
});
