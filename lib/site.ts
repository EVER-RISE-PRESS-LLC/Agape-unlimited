const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const donationUrl = process.env.NEXT_PUBLIC_DONATION_URL?.trim();
export const site = {
  name: "Agape Unlimited Foundation",
  email: email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null,
  donationUrl:
    donationUrl && /^https:\/\//.test(donationUrl) ? donationUrl : null,
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://agape-unlimited.everrisepressdev.workers.dev",
};
