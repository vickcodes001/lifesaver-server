import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER } from "../../config/env";

const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function sendWhatsappMessage(to: string, text: string) {
  console.log(`Sending Message to ${to}: ${text}`);

  // Ensure 'to' number has the correct format
  const toNumber = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
  const fromNumber = TWILIO_WHATSAPP_NUMBER?.startsWith('whatsapp:') 
    ? TWILIO_WHATSAPP_NUMBER 
    : `whatsapp:${TWILIO_WHATSAPP_NUMBER}`;

  try {
    const message = await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: text,
    });
    
    console.log(`Message sent successfully: ${message.sid}`);
    return message;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}