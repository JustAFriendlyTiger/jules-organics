"use client";

import { useState } from "react";

export default function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return (
      <p className="text-sm text-gray-300">
        Thanks for signing up! We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
      <label htmlFor="footer-email" className="text-sm text-gray-300">
        Enter your email address
      </label>
      <input
        id="footer-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email for updates"
        required
        className="rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-mauve"
      />
      <button type="submit" className="btn-mauve rounded-full py-3 px-6 text-sm font-semibold">
        Submit your information now
      </button>
    </form>
  );
}
