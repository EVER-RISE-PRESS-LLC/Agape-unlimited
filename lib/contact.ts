export const contactTopics = [
  { value: "general", label: "General question" },
  { value: "programs", label: "Programs & support" },
  { value: "volunteering", label: "Volunteering" },
  { value: "partnership", label: "Community partnerships" },
  { value: "donation", label: "Donations & giving" },
] as const;

export type ContactFields = {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
  consent: boolean;
  website: string;
};
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function validateContact(input: unknown): { fields: ContactFields; errors: ContactErrors } {
  const source = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const string = (key: string) => typeof source[key] === "string" ? source[key].trim() : "";
  const fields = { name: string("name"), email: string("email"), organization: string("organization"), topic: string("topic"), message: string("message"), consent: source.consent === true, website: string("website") };
  const errors: ContactErrors = {};
  if (fields.name.length < 2 || fields.name.length > 100 || /[\r\n]/.test(fields.name)) errors.name = "Enter your name (2–100 characters).";
  if (!emailPattern.test(fields.email) || fields.email.length > 254) errors.email = "Enter a valid email address so we can reply.";
  if (fields.organization.length > 150) errors.organization = "Keep the organization name to 150 characters or fewer.";
  if (!contactTopics.some(({ value }) => value === fields.topic)) errors.topic = "Choose a topic for your message.";
  if (fields.message.length < 10 || fields.message.length > 4000) errors.message = "Write a message between 10 and 4,000 characters.";
  if (!fields.consent) errors.consent = "Please acknowledge how your information will be used.";
  if (fields.website) errors.website = "Your message could not be submitted. Please try again.";
  return { fields, errors };
}
