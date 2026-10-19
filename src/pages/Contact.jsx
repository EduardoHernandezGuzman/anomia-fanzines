import { useEffect, useState } from "react";
import { isEmailjsConfigured } from "../lib/env";
import { sendContactEmail } from "../services/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTHS = {
  name: 80,
  email: 254,
  message: 2000,
};

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!errorMessage && !successMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const validateForm = () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      return "Tienes que llenar todos los campos.";
    }

    if (
      name.length > MAX_LENGTHS.name ||
      email.length > MAX_LENGTHS.email ||
      message.length > MAX_LENGTHS.message
    ) {
      return "Has superado la longitud máxima permitida.";
    }

    if (!EMAIL_REGEX.test(email)) {
      return "Introduce una dirección de email válida.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.website) {
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setSuccessMessage(false);
      setErrorMessage(validationError);
      return;
    }

    setIsSending(true);
    setErrorMessage("");

    try {
      await sendContactEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      setSuccessMessage(true);
      setForm(INITIAL_FORM);
    } catch {
      setErrorMessage(
        isEmailjsConfigured
          ? "No se pudo enviar el mensaje. Inténtalo de nuevo."
          : "El formulario de contacto no está configurado. Inténtalo más tarde.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto mt-40 mb-60 flex justify-center items-center">
      <div className="max-w-md px-8 py-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contáctanos</h2>
        <form onSubmit={handleSubmit} noValidate>
          {errorMessage && (
            <div
              className="bg-red-500 text-white font-medium text-center py-2 rounded mb-5"
              role="alert"
            >
              <strong>¡Error!</strong> {errorMessage}
            </div>
          )}
          {successMessage && (
            <div
              className="bg-green-500 text-white font-medium text-center py-2 rounded mb-5"
              role="status"
            >
              <strong>¡Mensaje enviado con éxito!</strong> Nos pondremos en contacto contigo pronto.
            </div>
          )}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">No rellenar este campo</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-1" htmlFor="name">
              Tu nombre
            </label>
            <input
              id="name"
              name="name"
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 transition duration-300"
              placeholder="nombre"
              type="text"
              maxLength={MAX_LENGTHS.name}
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-1" htmlFor="email">
              Tu email
            </label>
            <input
              id="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 transition duration-300"
              placeholder="email"
              type="email"
              maxLength={MAX_LENGTHS.email}
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-1" htmlFor="message">
              Tu mensaje
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 transition duration-300"
              rows="4"
              placeholder="mensaje"
              maxLength={MAX_LENGTHS.message}
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            className="w-full font-semibold bg-orange-500 text-black py-2 px-4 rounded-lg cursor-pointer hover:bg-orange-600 hover:text-white transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSending}
          >
            {isSending ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
