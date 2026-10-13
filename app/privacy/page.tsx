import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy", "Learn what information the Agape website contact form sends and how the website handles contact messages and donations.", "/privacy");

export default function PrivacyPage() {
  return <main id="main"><PageIntro name="Privacy" title="Your message, handled with care."><p>Here’s what happens to the information you share through this website.</p></PageIntro><div className="section-shell privacy-prose prose">
    <section><h2>Contact messages</h2><p>The contact form asks for your name, email address, a topic, and a message. You can also provide an organization name. When message delivery is available, this information is sent to the foundation’s configured email inbox through Resend, an email delivery service.</p><p>This website does not save contact messages to a website database. Messages that are sent may remain in the foundation’s inbox and the email provider’s systems. If you prepare a message but do not send it, the form does not submit that information.</p></section>
    <section><h2>Spam protection and technical information</h2><p>The form includes an automated spam check and limits repeated requests. Hosting services may process technical information, including your IP address and request details, to operate the website and prevent abuse. Contact message text is not intentionally written to application logs.</p></section>
    <section><h2>Donations</h2><p>Online donation links take you to the foundation’s configured donation provider. Payment information is entered on that provider’s website and handled under its own privacy practices. This website does not collect card numbers or process payments.</p></section>
    <section><h2>What to include in a message</h2><p>Please share only what we need to understand your question. Avoid sending passwords, payment information, or sensitive records through the form.</p></section>
    <section><h2>Questions about your information</h2><p><Link href="/contact">Contact the foundation</Link> to ask about a message you have sent or request help with your information.</p></section>
  </div></main>;
}
