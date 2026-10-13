"use client";

import Link from "next/link";
import { ArrowUpRight, CircleCheck, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactTopics, validateContact, type ContactErrors } from "@/lib/contact";
import { site } from "@/lib/site";

type Availability = "checking" | "ready" | "unavailable" | "error";
type ContactResponse = { available?: boolean; ok?: boolean; error?: string; errors?: ContactErrors };

export function ContactForm() {
  const [availability, setAvailability] = useState<Availability>("checking");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [topic, setTopic] = useState("general");
  const formRef = useRef<HTMLFormElement>(null);
  const feedback = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function check() {
      try {
        const response = await fetch("/api/contact", { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]), cache: "no-store" });
        if (!response.ok) throw new Error("Unavailable");
        const result = await response.json() as ContactResponse;
        if (typeof result?.available !== "boolean") throw new Error("Invalid response");
        setAvailability(result.available ? "ready" : "unavailable");
      } catch {
        if (!controller.signal.aborted) setAvailability("error");
      }
      if (!controller.signal.aborted) {
        const requested = new URLSearchParams(window.location.search).get("topic");
        if (contactTopics.some(({ value }) => value === requested)) setTopic(requested!);
      }
    }
    void check();
    return () => controller.abort();
  }, []);

  async function retryConnection() {
    setAvailability("checking");
    try {
      const response = await fetch("/api/contact", { cache: "no-store", signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error("Unavailable");
      const result = await response.json() as ContactResponse;
      if (typeof result?.available !== "boolean") throw new Error("Invalid response");
      setAvailability(result.available ? "ready" : "unavailable");
    } catch { setAvailability("error"); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || availability === "checking" || (!site.email && availability !== "ready")) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const { fields, errors: fieldErrors } = validateContact({ ...Object.fromEntries(data), consent: data.get("consent") === "on" });
    setErrors(fieldErrors);
    setNotice("");
    if (Object.keys(fieldErrors).length) {
      const key = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
      return;
    }
    if (availability !== "ready" && site.email) {
      const label = contactTopics.find(({ value }) => value === fields.topic)!.label;
      const body = `Name: ${fields.name}\nEmail: ${fields.email}\nOrganization: ${fields.organization || "Not provided"}\nTopic: ${label}\n\n${fields.message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Agape website: ${label}`)}&body=${encodeURIComponent(body)}`;
      setNotice("Send the prepared message in your email app to finish. If your email app doesn’t open, use the email address on this page. Your message has not been sent by the website.");
      return;
    }
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields), signal: AbortSignal.timeout(15000),
      });
      const result = await response.json() as ContactResponse;
      if (!response.ok || result?.ok !== true) {
        if (result?.errors) setErrors(result.errors);
        throw new Error(result?.error || "Your message couldn’t be sent. Please try again.");
      }
      form.reset();
      setSent(true);
      requestAnimationFrame(() => feedback.current?.focus());
    } catch (error) {
      setNotice(error instanceof Error && error.name !== "TimeoutError" ? error.message : "We couldn’t confirm that your message was sent. Please try again in a moment.");
    } finally { setSending(false); }
  }

  function errorFor(key: keyof ContactErrors) {
    return errors[key] ? <span id={`${key}-error`} className="field-error">{errors[key]}</span> : null;
  }

  if (sent) return <div className="form-success" ref={feedback} tabIndex={-1} role="status"><CircleCheck size={38} strokeWidth={1.5} aria-hidden="true" /><h3>Thank you for reaching out.</h3><p>Your message has been submitted to the foundation. We appreciate you taking the time to connect.</p><button className="text-link" onClick={() => { setSent(false); setNotice(""); requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("#contact-name")?.focus()); }}>Send another message<ArrowUpRight size={18} aria-hidden="true" /></button></div>;

  const fallback = availability !== "ready" && availability !== "checking" && Boolean(site.email);
  return (
    <form ref={formRef} onSubmit={submit} className="contact-form" aria-busy={sending}>
      <div className="form-availability" aria-live="polite">
        {availability === "checking" && <p>Checking message delivery…</p>}
        {availability === "unavailable" && <p>{site.email ? "Direct form delivery is being set up. You can send this message through your email app." : "Message delivery is being set up. Please check back soon to send your inquiry."}</p>}
        {availability === "error" && <p>We couldn’t connect to message delivery. <button type="button" className="inline-button" onClick={() => void retryConnection()}>Try connecting again</button>{site.email && " You can also send this message through your email app."}</p>}
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errorFor("name")}</div>
        <div className="form-field"><label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errorFor("email")}</div>
      </div>
      <div className="form-field"><label htmlFor="contact-organization">Organization <span className="optional-label">(optional)</span></label><input id="contact-organization" name="organization" autoComplete="organization" maxLength={150} aria-invalid={Boolean(errors.organization)} aria-describedby={errors.organization ? "organization-error" : undefined} />{errorFor("organization")}</div>
      <div className="form-field"><label htmlFor="contact-topic">What would you like to talk about? <span aria-hidden="true">*</span></label><select id="contact-topic" name="topic" value={topic} onChange={(event) => setTopic(event.target.value)} required aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? "topic-error" : undefined}>{contactTopics.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}</select>{errorFor("topic")}</div>
      <div className="form-field"><label htmlFor="contact-message">Your message <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" rows={6} required minLength={10} maxLength={4000} aria-invalid={Boolean(errors.message)} aria-describedby={`message-hint${errors.message ? " message-error" : ""}`} /><span id="message-hint" className="field-hint">A little context helps. Please leave out sensitive records and payment details.</span>{errorFor("message")}</div>
      <div className="form-trap" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div><label className="consent-label"><input type="checkbox" name="consent" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} /><span>I understand my information will be used to respond to my inquiry. Read our <Link href="/privacy">privacy information</Link>. <span aria-hidden="true">*</span></span></label>{errorFor("consent")}</div>

      {notice && <div className="form-notice" role="alert">{notice}</div>}
      <button className="button" type="submit" disabled={sending || availability === "checking" || (availability !== "ready" && !site.email)}>{sending ? <><LoaderCircle className="sending-icon" size={19} aria-hidden="true" />Sending…</> : <>{fallback ? "Open email app" : "Send message"}<ArrowUpRight size={19} aria-hidden="true" /></>}</button>
      <noscript><p className="field-hint">This form needs JavaScript to send a message.{site.email && <> You can email <a href={`mailto:${site.email}`}>{site.email}</a> directly.</>}</p></noscript>
    </form>
  );
}
