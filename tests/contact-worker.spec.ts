import { test, expect } from "@playwright/test";
import worker, { type ContactEnv } from "../worker/index";

const validMessage = { name: "Example Visitor", email: "visitor@example.com", organization: "", topic: "general", message: "I would like to learn about your programs.", consent: true, website: "" };
function environment(configured = true, allowed = true): ContactEnv {
  return {
    ASSETS: { fetch: async () => new Response("Static asset"), connect: () => { throw new Error("Socket connections are unused in this test."); } },
    CONTACT_RATE_LIMIT: { limit: async () => ({ success: allowed }) },
    ...(configured ? { RESEND_API_KEY: "test-key-never-sent", CONTACT_TO_EMAIL: "foundation@example.com", CONTACT_FROM_EMAIL: "website@example.com" } : {}),
  };
}
function request(input: unknown = validMessage, origin = "https://agape.example") {
  return new Request("https://agape.example/api/contact", { method: "POST", headers: { "Origin": origin, "Content-Type": "application/json" }, body: JSON.stringify(input) });
}

test("contact endpoint validates messages, origin, consent, and body limits before delivery", async () => {
  const env = environment();
  expect((await worker.fetch(request(validMessage, "https://other.example"), env)).status).toBe(403);
  expect((await worker.fetch(request({ ...validMessage, email: "invalid" }), env)).status).toBe(422);
  expect((await worker.fetch(request({ ...validMessage, consent: false }), env)).status).toBe(422);
  expect((await worker.fetch(request({ ...validMessage, website: "spam.example" }), env)).status).toBe(422);
  expect((await worker.fetch(request({ ...validMessage, topic: "unrecognized" }), env)).status).toBe(422);
  expect((await worker.fetch(request({ ...validMessage, message: "x".repeat(21000) }), env)).status).toBe(413);
  expect((await worker.fetch(request({ ...validMessage, message: "x".repeat(4001) }), env)).status).toBe(422);
  expect((await worker.fetch(new Request("https://agape.example/api/contact", { method: "DELETE" }), env)).status).toBe(405);
});

test("unconfigured contact endpoint and rate limiting never report a sent message", async () => {
  const unavailable = environment(false);
  const status = await worker.fetch(new Request("https://agape.example/api/contact"), unavailable);
  expect(await status.json()).toEqual({ available: false });
  const response = await worker.fetch(request(), unavailable);
  expect(response.status).toBe(503);
  expect(await response.json()).not.toHaveProperty("ok", true);
  const limited = await worker.fetch(request(), environment(true, false));
  expect(limited.status).toBe(429);
  expect(limited.headers.get("Retry-After")).toBe("60");
});

test("email submission uses the configured inbox and visitor reply-to, and reports provider failures", async () => {
  const originalFetch = globalThis.fetch;
  const calls: { url: string; data: Record<string, unknown> }[] = [];
  let providerSuccess = true;
  globalThis.fetch = async (input, init) => {
    calls.push({ url: String(input), data: JSON.parse(String(init?.body)) });
    return providerSuccess ? Response.json({ id: "test-only-id" }) : Response.json({ error: "test failure" }, { status: 500 });
  };
  try {
    const response = await worker.fetch(request(), environment());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(calls[0]).toMatchObject({ url: "https://api.resend.com/emails", data: { to: ["foundation@example.com"], from: "website@example.com", reply_to: "visitor@example.com", subject: "Agape website: General question" } });
    providerSuccess = false;
    const failure = await worker.fetch(request(), environment());
    expect(failure.status).toBe(502);
    expect(await failure.json()).not.toHaveProperty("ok", true);
  } finally { globalThis.fetch = originalFetch; }
});

test("worker keeps static asset routes working and rejects unknown API routes", async () => {
  const response = await worker.fetch(new Request("https://agape.example/about"), environment(false));
  expect(await response.text()).toBe("Static asset");
  expect((await worker.fetch(new Request("https://agape.example/api/unknown"), environment(false))).status).toBe(404);
});
