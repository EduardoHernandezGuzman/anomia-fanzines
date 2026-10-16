import { AgeVerification, FanzineCard } from "../components";
import { useAgeVerification, useFanzineFilter } from "../hooks";

const Products = () => {
  const { isVerified, confirmAge } = useAgeVerification();
  const {
    categories,
    selectedCategory,
    selectCategory,
    currentFanzines,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useFanzineFilter();

  if (!isVerified) {
    return <AgeVerification onConfirm={confirmAge} />;
  }

  return (
    <div className="p-5 mt-24 flex flex-col items-center">
      <div className="flex justify-center mb-16">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`mx-2 px-4 py-2 cursor-pointer border-none transition-colors duration-300 
              ${selectedCategory === category ? "text-orange-500" : "text-black hover:text-orange-500"}`}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-items-center">
        {currentFanzines.map((fanzine) => (
          <FanzineCard
            key={fanzine.id}
            titulo={fanzine.titulo}
            fecha={fanzine.fecha}
            imagen={fanzine.imagen}
            enlace={fanzine.enlace}
          />
        ))}
      </div>

      <div className="flex justify-center mt-16">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              type="button"
              aria-current={currentPage === page ? "page" : undefined}
              className={`mx-1 px-3 py-2 cursor-pointer border border-gray-300 rounded-sm transition-colors duration-300 
                ${currentPage === page ? "text-orange-500" : "text-black hover:text-orange-500"}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
