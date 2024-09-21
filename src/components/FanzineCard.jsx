const FanzineCard = ({ titulo, fecha, imagen, enlace }) => {
  return (
    <div className="border border-gray-300 p-4 text-center rounded-lg bg-white transition-transform transform hover:-translate-y-2 hover:shadow-xl max-w-[250px] mx-auto hover:border-orange-500">
      <img 
        src={imagen} 
        alt={titulo} 
        className="w-full h-auto max-w-[200px] object-cover rounded-md transition-transform duration-300 hover:scale-105"
      />

      <h5 className="my-2 text-lg font-semibold text-gray-900">{titulo}</h5>

      <p className="text-sm text-gray-500">{fecha}</p>

      <a
        href={enlace}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-orange-600"
      >
        Comprar
      </a>
    </div>
  );
};

export default FanzineCard;
