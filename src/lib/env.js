const emailjs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_USER_ID,
};

const missingEmailjsVars = Object.entries(emailjs)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const isEmailjsConfigured = missingEmailjsVars.length === 0;

export const getEmailjsConfig = () => {
  if (!isEmailjsConfigured) {
    throw new Error(
      `Faltan variables de entorno de EmailJS: ${missingEmailjsVars.join(", ")}. Revisa .env.example y la configuración del entorno.`
    );
  }

  return emailjs;
};
