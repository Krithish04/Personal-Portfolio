"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot field - invisible to humans
  const [hpWebsite, setHpWebsite] = useState("");
  const [formLoadedAt, setFormLoadedAt] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          hp_website: hpWebsite,
          formLoadedAt,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Unable to send message.");
      } else {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please try reaching out by email directly.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Nav />
      <main id="main-content" className="flex-1 max-w-container w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <header className="mb-6 sm:mb-8">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
            Communication
          </span>
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-semibold tracking-tight text-text mt-1.5 sm:mt-2 mb-2 sm:mb-3">
            Get in touch
          </h1>
          <p className="text-text-muted text-xs sm:text-sm md:text-base leading-relaxed max-w-prose">
            Have a project in mind, an opportunity to discuss, or an engineering question? Leave a note below or reach out via email.
          </p>
        </header>

        <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-lg bg-surface border border-border flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs sm:text-sm font-mono">
          <span className="text-text-muted">Direct Email:</span>
          <a
            href="mailto:suvarnakrithish24@gmail.com"
            className="text-accent hover:underline inline-flex items-center gap-1 font-sans font-medium break-all"
          >
            <span>suvarnakrithish24@gmail.com</span>
            <ArrowUpRight size={14} className="shrink-0" />
          </a>
        </div>

        {status === "success" ? (
          <div className="p-6 rounded-lg bg-surface border border-accent/40 text-center space-y-2">
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-text">
              Message Received
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Thank you for reaching out. I have received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 px-4 py-2 rounded text-xs font-mono border border-border text-text hover:border-accent transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === "error" && (
              <div
                role="alert"
                className="p-3 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium"
              >
                {errorMessage}
              </div>
            )}

            {/* Invisible Honeypot Field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp_website">Leave this field blank</label>
              <input
                id="hp_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hpWebsite}
                onChange={(e) => setHpWebsite(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-xs font-mono text-text-muted mb-1">
                Your Name <span className="text-accent">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono text-text-muted mb-1">
                Email Address <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@domain.com"
                className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono text-text-muted mb-1">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your note, project inquiry, or question..."
                className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none transition-colors resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto py-2.5 px-6 rounded bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm"
            >
              {status === "submitting" ? "Delivering..." : "Send Message"}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
