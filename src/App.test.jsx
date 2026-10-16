import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

describe("enrutado", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("muestra la página 404 en rutas desconocidas", async () => {
    window.history.pushState({}, "", "/ruta-inexistente");

    render(<App />);

    expect(
      await screen.findByText(/Parece que te has perdido en el vacío de lo desconocido/),
    ).toBeInTheDocument();
  });

  it("pide la verificación de edad en la tienda y muestra el catálogo al confirmar", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/products");

    render(<App />);

    await user.click(await screen.findByRole("button", { name: "Sí" }));

    expect(await screen.findByText("Iconostasis 1")).toBeInTheDocument();
  });
});
