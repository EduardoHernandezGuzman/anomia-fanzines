import { useMemo, useState } from "react";
import { FANZINES, FANZINE_CATEGORIES } from "../data/fanzines";

const FANZINES_PER_PAGE = 5;

export const useFanzineFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredFanzines = useMemo(
    () =>
      selectedCategory
        ? FANZINES.filter((fanzine) => fanzine.categoria === selectedCategory)
        : FANZINES,
    [selectedCategory],
  );

  const totalPages = Math.max(1, Math.ceil(filteredFanzines.length / FANZINES_PER_PAGE));

  const currentFanzines = useMemo(() => {
    const indexOfLastFanzine = currentPage * FANZINES_PER_PAGE;
    return filteredFanzines.slice(indexOfLastFanzine - FANZINES_PER_PAGE, indexOfLastFanzine);
  }, [filteredFanzines, currentPage]);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return {
    categories: FANZINE_CATEGORIES,
    selectedCategory,
    selectCategory,
    currentFanzines,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
