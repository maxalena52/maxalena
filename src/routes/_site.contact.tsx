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
  const [news, setNews] = useState("");
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
      setNews("");
    } catch {
      setStatus("error");
      setNote("The message could not be sent. Please try again.");
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send({ name, email, subject, message });
  }

  function subscribe(e: FormEvent) {
    e.preventDefault();
    void send({
      name: "Newsletter",
      email: news,
      subject: "Newsletter",
      message: "Please add this address to the Maxalena newsletter.",
    });
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
          <form onSubmit={subscribe} className="glass-panel p-4">
            <h2 className="font-display text-3xl text-[#ffe7a8]">Newsletter</h2>
            <p className="mt-1 text-sm text-pink-50/85">New stories, universe notes, and the occasional announcement.</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input required type="email" value={news} onChange={(e) => setNews(e.target.value)} placeholder="Enter your email" className="ink-input" />
              <button type="submit" className="gold-pill" disabled={status === "sending"}>
                Subscribe
              </button>
            </div>
          </form>
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
            {socials.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="ghost-pill" target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-pink-100/70">Social accounts will appear here when they are public.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
