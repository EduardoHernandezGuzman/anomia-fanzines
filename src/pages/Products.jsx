import { useState } from "react";
import listadoAnomia from "../data/ListadoAnomia"; 
import FanzineCard from "../components/FanzineCard";
import AgeVerification from "../components/AgeVerification";
import { Link, useLocation } from "react-router-dom";

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const fanzinesPerPage = 5;

  const categories = ["Iconostasis", "Iconostasis Mini", "Otros"];
  const location = useLocation();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredFanzines = selectedCategory
    ? listadoAnomia.filter((fanzine) => fanzine.categoria === selectedCategory)
    : listadoAnomia;

  const indexOfLastFanzine = currentPage * fanzinesPerPage;
  const indexOfFirstFanzine = indexOfLastFanzine - fanzinesPerPage;
  const currentFanzines = filteredFanzines.slice(indexOfFirstFanzine, indexOfLastFanzine);
  const totalPages = Math.ceil(filteredFanzines.length / fanzinesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAgeVerification = (isAdult) => {
    if (isAdult) {
      setIsVerified(true);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  if (!isVerified) {
    return <AgeVerification onConfirm={handleAgeVerification} />;
  }

  return (
    <div className="p-5 mt-24 flex flex-col items-center">
      <div className="flex justify-center mb-16">
        {categories.map((category) => (
          <button
            key={category}
            className={`mx-2 px-4 py-2 cursor-pointer border-none transition-colors duration-300 
              ${selectedCategory === category ? "text-orange-500" : "text-black hover:text-orange-500"}`}
            onClick={() => handleCategoryChange(category)}
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
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index + 1}
            className={`mx-1 px-3 py-2 cursor-pointer border border-gray-300 rounded transition-colors duration-300 
              ${currentPage === index + 1 ? "text-orange-500" : "text-black hover:text-orange-500"}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};
