"use strict";
const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

router.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2)
    return res.status(400).json({ success: false, message: "Please provide a valid name (at least 2 characters)." });
  if (!email || !isValidEmail(email))
    return res.status(400).json({ success: false, message: "Please provide a valid email address." });
  if (!message || typeof message !== "string" || message.trim().length < 10)
    return res.status(400).json({ success: false, message: "Message must be at least 10 characters." });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const safeMessage = message.trim().replace(/\n/g, "<br/>");

    // Email to portfolio owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email.trim(),
      subject: `[Portfolio] New message from ${name.trim()}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:32px;border-radius:12px">
          <h2 style="color:#f97316;margin:0 0 24px">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#94a3b8;width:80px">Name</td><td style="padding:8px 0;font-weight:600">${name.trim()}</td></tr>
            <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0"><a href="mailto:${email.trim()}" style="color:#f97316">${email.trim()}</a></td></tr>
          </table>
          <hr style="border:1px solid #1e293b;margin:24px 0"/>
          <p style="color:#94a3b8;margin:0 0 8px">Message:</p>
          <p style="background:#1e293b;padding:16px;border-radius:8px;margin:0;line-height:1.6">${safeMessage}</p>
          <p style="color:#475569;font-size:12px;margin:24px 0 0">Sent from your portfolio contact form</p>
        </div>`,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Sufyan Khan" <${process.env.EMAIL_USER}>`,
      to: email.trim(),
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:32px;border-radius:12px">
          <h2 style="color:#f97316;margin:0 0 16px">Hi ${name.trim()},</h2>
          <p style="line-height:1.7;color:#cbd5e1">Thanks for getting in touch! I have received your message and will get back to you soon, usually within 24-48 hours.</p>
          <p style="line-height:1.7;color:#cbd5e1">In the meantime, feel free to check out my
            <a href="https://github.com/Afnan-Sufian" style="color:#f97316">GitHub</a> or connect on
            <a href="https://www.linkedin.com/in/sufyan-khan-68855940b" style="color:#0ea5e9">LinkedIn</a>.
          </p>
          <br/>
          <p>Best regards,<br/><strong style="color:#f97316">Sufyan Khan</strong></p>
          <hr style="border:1px solid #1e293b;margin:24px 0"/>
          <p style="color:#475569;font-size:11px">This is an automated reply. Please do not reply to this email directly.</p>
        </div>`,
    });

    console.log(`[Contact] Mail sent — ${name.trim()} <${email.trim()}>`);
    return res.json({ success: true, message: "Message sent! I will get back to you soon." });
  } catch (err) {
    console.error("[Contact] Error:", err.message);
    return res.status(500).json({ success: false, message: "Failed to send message. Please try again or email me directly." });
  }
});

module.exports = router;
