import { useState } from "react";
import "./Contact.css";

const contactInfo = [
  {
    icon: "E",
    label: "Email",
    value: "12sufyan16@gmail.com",
    href: "mailto:12sufyan16@gmail.com",
    color: "#f97316",
  },
  {
    icon: "G",
    label: "GitHub",
    value: "github.com/Afnan-Sufian",
    href: "https://github.com/Afnan-Sufian",
    color: "#e2e8f0",
  },
  {
    icon: "L",
    label: "LinkedIn",
    value: "linkedin.com/in/sufyan-khan",
    href: "https://www.linkedin.com/in/sufyan-khan-68855940b",
    color: "#0ea5e9",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-tag">
          <span>Contact <strong>Me</strong></span>
        </div>
        <div className="section-line" />
        <div className="contact__layout">
          <div className="contact__info">
            <p className="contact__intro">
              I am open to freelance projects, collaborations, and full-time opportunities. Feel free to reach out!
            </p>
            {contactInfo.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact__card card">
                <span className="contact__card-icon" style={{ color: c.color }}>{c.icon}</span>
                <div>
                  <p className="contact__card-label">{c.label}</p>
                  <p className="contact__card-value" style={{ color: c.color }}>{c.value}</p>
                </div>
              </a>
            ))}
            <div className="contact__availability">
              <span className="contact__availability-dot" />
              Available for new opportunities
            </div>
          </div>
          <form className="contact__form card" onSubmit={handleSubmit}>
            <h3 className="contact__form-title">Send a Message</h3>
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" placeholder="Your name..." value={form.name} onChange={handleChange} required />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Your Email</label>
                <input id="email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" id="send-message-btn" className="btn-primary contact__submit">
              Send Message
            </button>
            {status === "success" && (
              <p className="contact__msg contact__msg--success">Message sent successfully! I will get back to you soon.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}