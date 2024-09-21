const AgeVerification = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Confirmación de Edad</h2>
        
        <p className="text-gray-700 mb-6">
          Debes ser mayor de edad para ver este contenido. ¿Eres mayor de 18 años?
        </p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onConfirm(true)}
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-orange-600"
          >
            Sí
          </button>
          <button
            onClick={() => onConfirm(false)}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-full transition-colors duration-300 hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
