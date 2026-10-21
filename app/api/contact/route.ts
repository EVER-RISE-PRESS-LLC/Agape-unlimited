// Static previews have no email delivery. Cloudflare's Worker handles this route
// in production and reports the actual runtime secret configuration.
export const dynamic = "force-static";

export function GET() {
  return Response.json({ available: false }, { headers: { "X-Robots-Tag": "noindex" } });
}
