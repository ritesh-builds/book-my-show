// integrations/messaging/whatsapp.ts — WhatsApp Business API stub

// TODO: Integrate with WhatsApp Business API (Meta Cloud API or Twilio)
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api

interface WhatsAppMessage {
  to: string;
  templateName: string;
  parameters: string[];
}

async function sendTemplate(message: WhatsAppMessage): Promise<void> {
  // TODO: Implement via fetch/axios using WHATSAPP_TOKEN and WHATSAPP_PHONE_ID env vars
  console.info('[WhatsApp stub] Would send:', message);
}

export const whatsappService = {
  async sendBookingConfirmation(phone: string, bookingId: string, movieName: string): Promise<void> {
    await sendTemplate({
      to: phone,
      templateName: 'booking_confirmation',
      parameters: [bookingId, movieName],
    });
  },

  async sendOtp(phone: string, otp: string): Promise<void> {
    await sendTemplate({
      to: phone,
      templateName: 'otp_verification',
      parameters: [otp],
    });
  },
};
