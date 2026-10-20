const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const donationUrl = process.env.NEXT_PUBLIC_DONATION_URL?.trim();
const publicUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://agape-unlimited.everrisepressdev.workers.dev",
);
if (publicUrl.protocol !== "https:" || publicUrl.username || publicUrl.password ||
    publicUrl.pathname !== "/" || publicUrl.search || publicUrl.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without credentials, a path, query, or fragment.");
}
function approvedDonationUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
export const site = {
  name: "Agape Unlimited Foundation",
  description: "Community-driven support for children and families in Georgia, United States, through education, mentorship, resources, and local connections.",
  email: email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null,
  donationUrl: approvedDonationUrl(donationUrl),
  url: publicUrl.origin,
};
