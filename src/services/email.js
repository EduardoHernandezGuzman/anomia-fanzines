import emailjs from "@emailjs/browser";
import { getEmailjsConfig } from "../lib/env";

export const sendContactEmail = ({ name, email, message }) => {
  const { serviceId, templateId, publicKey } = getEmailjsConfig();

  return emailjs.send(
    serviceId,
    templateId,
    {
      name,
      message,
      reply_to: email,
    },
    { publicKey }
  );
};
