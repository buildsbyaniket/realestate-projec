import nodemailer from 'nodemailer';

/**
 * Send an email using Nodemailer.
 * Configuration is read from environment variables:
 *   EMAIL_HOST - SMTP host (e.g., smtp.gmail.com)
 *   EMAIL_PORT - SMTP port (e.g., 587)
 *   EMAIL_USER - SMTP username (full email address)
 *   EMAIL_PASS - SMTP password or app-specific password
 *   EMAIL_FROM - Optional, default to EMAIL_USER
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const host = process.env.EMAIL_HOST;
  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM || user;

  if (!host || !user || !pass) {
    console.warn('Email credentials are not fully set in .env. Skipping email send.');
    return; // Gracefully skip sending if not configured
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
