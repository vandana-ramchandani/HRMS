import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (options: {
  html?: string;
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const AssignProjectEmail = async (to: string, projectName: string) => {
  const subject = `Project Assigned: ${projectName}`;
  const text = `You have been assigned to the project: ${projectName}. Please check your dashboard for more details.`;
  const html = `<p>You have been assigned to the project: <strong>${projectName}</strong>.</p><p>Please check your dashboard for more details.</p><br>Best regards,<br>HR Team</p>`;

  await sendEmail({ to, subject, text, html });
}