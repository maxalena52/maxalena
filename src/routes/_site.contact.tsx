import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { submitContact } from "@/lib/contact";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Maxalena L." },
      { name: "description", content: "Write to Maxalena L. through the official contact form." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await submitContact({
        data: { name, email, subject, message, website },
      });
      setStatus("sent");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("The message could not be sent. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="ink-panel p-6 md:p-10">
      <p className="font-ui mb-2 text-xs uppercase tracking-[0.22em] text-[#c6a15b]">Correspondence</p>
      <h1 className="font-display text-5xl text-[#f4ead8]">Contact</h1>
      <p className="mt-4 leading-8 text-[#d8ccb4]">
        Write to Maxalena L. using the form below. There is no public email address on this site.
      </p>
      <div className="gold-rule my-8" />

      {status === "sent" ? (
        <div className="card-frame p-8">
          <h2 className="font-display text-3xl">Message received</h2>
          <p className="mt-3 text-parchment">Thank you. Your enquiry has been sent.</p>
        </div>
      ) : (
        <form onSubmit={(e) => void onSubmit(e)} className="card-frame space-y-4 p-6 md:p-8">
          <div className="hidden" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <label className="font-ui block text-xs uppercase tracking-widest text-taupe">
            Name
            <input
              required
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ink-field"
            />
          </label>
          <label className="font-ui block text-xs uppercase tracking-widest text-taupe">
            Email
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ink-field"
            />
          </label>
          <label className="font-ui block text-xs uppercase tracking-widest text-taupe">
            Subject
            <input
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="ink-field"
            />
          </label>
          <label className="font-ui block text-xs uppercase tracking-widest text-taupe">
            Message
            <textarea
              required
              name="message"
              minLength={10}
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="ink-field"
            />
          </label>
          {error && <p className="text-sm text-parchment">{error}</p>}
          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
      </div>
    </div>
  );
}
