// integrations/messaging/email.ts — Nodemailer email wrapper

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env['SMTP_HOST'] ?? 'localhost',
      port: Number(process.env['SMTP_PORT'] ?? '587'),
      secure: process.env['SMTP_SECURE'] === 'true',
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS'],
      },
    });
  }
  return transporter;
}

const FROM = process.env['EMAIL_FROM'] ?? 'noreply@bookmyshow.com';

export const emailService = {
  async sendBookingConfirmation(to: string, bookingId: string): Promise<void> {
    await getTransporter().sendMail({
      from: FROM,
      to,
      subject: `Booking Confirmed — ${bookingId}`,
      html: `<p>Your booking <strong>${bookingId}</strong> has been confirmed. Enjoy the show!</p>`,
    });
  },

  async sendOtp(to: string, otp: string): Promise<void> {
    await getTransporter().sendMail({
      from: FROM,
      to,
      subject: 'Your BookMyShow OTP',
      html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 10 minutes. Do not share this.</p>`,
    });
  },

  async sendCancellationConfirmation(to: string, bookingId: string): Promise<void> {
    await getTransporter().sendMail({
      from: FROM,
      to,
      subject: `Booking Cancelled — ${bookingId}`,
      html: `<p>Your booking <strong>${bookingId}</strong> has been cancelled. Refund will be processed in 5-7 days.</p>`,
    });
  },
};
