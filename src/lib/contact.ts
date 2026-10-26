import { site } from "@/lib/site";

export type ContactPayload = {
  fullName: string;
  email: string;
  company: string;
};

export function submitContact(data: ContactPayload): { ok: boolean } {
  const subject = `DA One Contact Request - ${data.company}`;
  const body = [
    "DA One Contact Request",
    "",
    `Full Name: ${data.fullName}`,
    `Work Email: ${data.email}`,
    `Company: ${data.company}`,
  ].join("\n");

  const mailtoUrl =
    `mailto:${site.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
  return { ok: true };
}
