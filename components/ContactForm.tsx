"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";

// Sends the enquiry straight to WhatsApp (or email), so no server or database is needed.
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", contact: "", occasion: "Bridal", date: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const body = [
    `Hi! I'd like to book a consultation.`,
    `Name: ${form.name}`,
    `Contact: ${form.contact}`,
    `Occasion: ${form.occasion}`,
    form.date && `Event date: ${form.date}`,
    form.message && `Details: ${form.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
  };

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label>
          <span>Your name</span>
          <input required value={form.name} onChange={set("name")} placeholder="Jane Doe" />
        </label>
        <label>
          <span>Email or phone</span>
          <input required value={form.contact} onChange={set("contact")} placeholder="you@email.com" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Occasion</span>
          <select value={form.occasion} onChange={set("occasion")}>
            <option>Bridal</option>
            <option>Evening</option>
            <option>Formal</option>
            <option>Custom / Other</option>
          </select>
        </label>
        <label>
          <span>Event date</span>
          <input type="date" value={form.date} onChange={set("date")} />
        </label>
      </div>
      <label>
        <span>Tell me about your dream outfit</span>
        <textarea rows={4} value={form.message} onChange={set("message")} placeholder="Colors, fabrics, references, budget..." />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Send via WhatsApp
        </button>
        <a
          className="btn btn-ghost"
          href={`mailto:${profile.email}?subject=${encodeURIComponent("Consultation request")}&body=${encodeURIComponent(body)}`}
        >
          Send via Email
        </a>
      </div>
    </form>
  );
}
