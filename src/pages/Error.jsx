import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[85vh] px-4 py-24">
      <h1 className="text-gray-800 font-bold text-2xl mb-4 text-center">
        Parece que te has perdido en el vacío de lo desconocido.
      </h1>
      <p className="text-gray-700 mb-8 text-center">
        No te preocupes, los grandes descubrimientos a menudo nacen de la desorientación. 
        Vuelve a la página principal y continúa tu exploración.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
      >
        Regresar al Inicio
      </Link>
    </div>
  );
};
