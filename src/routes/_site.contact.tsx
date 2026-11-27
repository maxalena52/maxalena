import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { submitContact } from "@/lib/contact";
import { socialLinks } from "@/lib/content";
import { useLibrary } from "@/lib/use-library";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Maxalena" },
      { name: "description", content: "Reach Maxalena with a message, idea, question, or opportunity." },
    ],
  }),
  component: ContactPage,
});

const SUBJECTS = ["General", "Rights & inquiries", "Collaboration", "A question about a story", "Something else"];

function ContactPage() {
  const { settings } = useLibrary();
  const socials = socialLinks(settings);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  async function send(data: { name: string; email: string; subject: string; message: string }) {
    setStatus("sending");
    setNote("");
    try {
      await submitContact({ data: { ...data, website } });
      setStatus("sent");
      setNote("Message received. Thank you.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setNote("The message could not be sent. Please try again.");
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send({ name, email, subject, message });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <header className="mb-5 text-center">
        <h1 className="page-title text-7xl md:text-8xl">Contact</h1>
        <p className="mt-2 text-sm text-pink-50/90 md:text-base">
          We'd love to hear from you. Reach out with a message, idea, question, or opportunity.
        </p>
      </header>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <form onSubmit={onSubmit} className="glass-panel p-5 md:p-7">
          <h2 className="font-display text-4xl text-[#ffe7a8]">Send a message</h2>
          <p className="mt-1 text-sm text-pink-50/80">Have a question, a suggestion, or something you have been meaning to say.</p>
          <div className="hidden" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-bold">
              Name
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="ink-input mt-1" />
            </label>
            <label className="text-sm font-bold">
              Email
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="ink-input mt-1" />
            </label>
          </div>
          <label className="mt-3 block text-sm font-bold">
            Subject
            <select required value={subject} onChange={(e) => setSubject(e.target.value)} className="ink-input mt-1">
              <option value="">Choose a subject...</option>
              {SUBJECTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-sm font-bold">
            Message
            <textarea required minLength={10} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here..." rows={6} className="ink-input mt-1" />
          </label>
          <button type="submit" className="gold-pill mx-auto mt-5" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {note && <p className="mt-3 text-center text-sm text-pink-50">{note}</p>}
          <p className="mt-4 text-center text-xs text-pink-100/70">Your information is kept private and is used only to reply.</p>
        </form>
        <div className="grid gap-3">
          <aside className="glass-panel p-4">
            <h2 className="font-display text-3xl text-[#ffe7a8]">Rights & inquiries</h2>
            <p className="mt-1 text-sm text-pink-50/85">Publishing rights, media, and official requests.</p>
            <a className="ghost-pill mt-3" href="mailto:rights@maxalena.com">
              rights@maxalena.com
            </a>
          </aside>
          <aside className="glass-panel p-4">
            <h2 className="font-display text-3xl text-[#ffe7a8]">Collaboration</h2>
            <p className="mt-1 text-sm text-pink-50/85">A creative collaboration, partnership, or project.</p>
            <a className="ghost-pill mt-3" href="mailto:collab@maxalena.com">
              collab@maxalena.com
            </a>
          </aside>
          <aside className="glass-panel p-4">
            <h2 className="font-display text-3xl text-[#ffe7a8]">Social links</h2>
            <p className="mt-1 text-sm text-pink-50/85">Follow along for stories and what happens behind them.</p>
            <div className="social-row">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                  <SocialIcon name={s.label} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };
  if (name === "YouTube") {
    return (
      <svg {...common}>
        <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg {...common}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm8.6 2.2a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 8.2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2z" />
      </svg>
    );
  }
  if (name === "TikTok") {
    return (
      <svg {...common}>
        <path d="M14 3c.4 2.6 1.8 4.4 4.2 4.8v2.4c-1.5 0-2.9-.5-4.2-1.4v6.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.6a3 3 0 1 0 2.1 2.9V3z" />
      </svg>
    );
  }
  if (name === "X") {
    return (
      <svg {...common}>
        <path d="M4 4h4.2l3.3 4.6L15.6 4H20l-6.1 7.2L20.4 20h-4.2l-3.6-5-4.4 5H4l6.6-7.6z" />
      </svg>
    );
  }
  if (name === "Twitch") {
    return (
      <svg {...common}>
        <path d="M5 3h15v10l-4 4h-4l-2 2H8v-2H5zm3 2v8h3v2l2-2h4l2-2V5zm7 2h2v4h-2zm-4 0h2v4h-2z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M8.2 8.4a7.2 7.2 0 0 1 7.6 0l.6-1.6A9 9 0 0 0 7.6 6.8zm7.6 7.2-.6-1.6a7.2 7.2 0 0 1-7.6 0l-.6 1.6a9 9 0 0 0 8.8 0zM6.4 9.2 4.8 7.8a9 9 0 0 0 0 8.4l1.6-1.4a7.2 7.2 0 0 1 0-5.6zm11.2 0a7.2 7.2 0 0 1 0 5.6l1.6 1.4a9 9 0 0 0 0-8.4zM9.2 12a1.2 1.2 0 1 0 1.2 1.2A1.2 1.2 0 0 0 9.2 12zm5.6 0a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2z" />
    </svg>
  );
}
