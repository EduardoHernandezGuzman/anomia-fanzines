import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FANZINES } from "../data/fanzines";
import { useFanzineFilter } from "./useFanzineFilter";

describe("useFanzineFilter", () => {
  it("devuelve la primera página con 5 fanzines y todas las categorías", () => {
    const { result } = renderHook(() => useFanzineFilter());

    expect(result.current.currentFanzines).toHaveLength(5);
    expect(result.current.categories).toEqual(["Iconostasis", "Iconostasis Mini", "Otros"]);
    expect(result.current.totalPages).toBe(Math.ceil(FANZINES.length / 5));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.selectedCategory).toBe("");
  });

  it("filtra por categoría y reinicia la paginación", () => {
    const { result } = renderHook(() => useFanzineFilter());

    act(() => {
      result.current.setCurrentPage(2);
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.selectCategory("Iconostasis Mini");
    });

    expect(result.current.selectedCategory).toBe("Iconostasis Mini");
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.currentFanzines).toHaveLength(2);
    expect(
      result.current.currentFanzines.every((fanzine) => fanzine.categoria === "Iconostasis Mini"),
    ).toBe(true);
  });

  it("pagina los resultados", () => {
    const { result } = renderHook(() => useFanzineFilter());

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentFanzines).toHaveLength(5);
    expect(result.current.currentFanzines[0].id).toBe(6);
  });

  it("calcula las páginas según el filtro activo", () => {
    const { result } = renderHook(() => useFanzineFilter());

    act(() => {
      result.current.selectCategory("Iconostasis");
    });

    expect(result.current.totalPages).toBe(5);

    act(() => {
      result.current.setCurrentPage(5);
    });

    expect(result.current.currentFanzines).toHaveLength(5);
    expect(result.current.currentFanzines[0].id).toBe(21);
  });
});
