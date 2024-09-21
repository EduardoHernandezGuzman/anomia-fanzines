import { useState } from "react";
import emailjs from "emailjs-com";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, email, message].includes("")) {
      setErrorInput(true);
      setTimeout(() => {
        setErrorInput(false);
      }, 5000);
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: name,
          message: message,
          reply_to: email,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setSuccessMessage(true);

        setTimeout(() => {
          setSuccessMessage(false);
        }, 5000);

        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        console.error("Failed to send email. Error: ", err);
        alert("Error al enviar el mensaje. Inténtalo de nuevo.");
      });
  };

  return (
    <div className="container px-4 mx-auto mt-40 mb-60 flex justify-center items-center">
      <div className="max-w-md px-8 py-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          {errorInput && (
            <div className="bg-red-500 text-white font-medium text-center py-2 rounded mb-5">
              <strong>¡Error!</strong> Tienes que llenar todos los campos.
            </div>
          )}
          {successMessage && (
            <div className="bg-green-500 text-white font-medium text-center py-2 rounded mb-5">
              <strong>¡Mensaje enviado con éxito!</strong> Nos pondremos en contacto contigo pronto.
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-800 mb-1" htmlFor="name">Tu nombre</label>
            <input
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 transition duration-300"
              placeholder="nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-1" htmlFor="email">Tu email</label>
            <input
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 transition duration-300"
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-1" htmlFor="message">Tu mensaje</label>
            <textarea
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 transition duration-300"
              rows="4"
              placeholder="mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            className="w-full font-semibold bg-orange-500 text-black py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
