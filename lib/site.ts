const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const donationUrl = process.env.NEXT_PUBLIC_DONATION_URL?.trim();
function approvedDonationUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
export const site = {
  name: "Agape Unlimited Foundation",
  email: email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null,
  donationUrl: approvedDonationUrl(donationUrl),
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://agape-unlimited.everrisepressdev.workers.dev",
};
