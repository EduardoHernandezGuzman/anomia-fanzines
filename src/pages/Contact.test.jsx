import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";
import { sendContactEmail } from "../services/email";

const envMock = vi.hoisted(() => ({ isEmailjsConfigured: true }));

vi.mock("../lib/env", () => envMock);

vi.mock("../services/email", () => ({
  sendContactEmail: vi.fn(),
}));

const fillValidForm = async (user) => {
  await user.type(screen.getByLabelText("Tu nombre"), "Ana");
  await user.type(screen.getByLabelText("Tu email"), "ana@example.com");
  await user.type(screen.getByLabelText("Tu mensaje"), "Hola, quiero colaborar");
};

describe("Contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    envMock.isEmailjsConfigured = true;
  });

  it("muestra un error si faltan campos y no envía nada", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Tienes que llenar todos los campos.");
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("valida el formato del email", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText("Tu nombre"), "Ana");
    await user.type(screen.getByLabelText("Tu email"), "no-es-un-email");
    await user.type(screen.getByLabelText("Tu mensaje"), "Hola");

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Introduce una dirección de email válida.");
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("ignora el envío si el campo trampa (honeypot) está relleno", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    fireEvent.change(screen.getByLabelText("No rellenar este campo"), {
      target: { value: "spam" },
    });

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(sendContactEmail).not.toHaveBeenCalled();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("envía el mensaje, muestra el éxito y limpia el formulario", async () => {
    sendContactEmail.mockResolvedValue({ status: 200 });
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText("Tu nombre"), "  Ana  ");
    await user.type(screen.getByLabelText("Tu email"), "ana@example.com");
    await user.type(screen.getByLabelText("Tu mensaje"), "Hola");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByRole("status")).toHaveTextContent("¡Mensaje enviado con éxito!");
    expect(sendContactEmail).toHaveBeenCalledWith({
      name: "Ana",
      email: "ana@example.com",
      message: "Hola",
    });
    expect(screen.getByLabelText("Tu nombre")).toHaveValue("");
    expect(screen.getByLabelText("Tu mensaje")).toHaveValue("");
  });

  it("muestra un error genérico si el envío falla", async () => {
    sendContactEmail.mockRejectedValue(new Error("backend caído"));
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No se pudo enviar el mensaje. Inténtalo de nuevo.",
    );
  });

  it("muestra el error de configuración cuando falta EmailJS", async () => {
    envMock.isEmailjsConfigured = false;
    sendContactEmail.mockRejectedValue(new Error("Faltan variables de entorno"));
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "El formulario de contacto no está configurado. Inténtalo más tarde.",
    );
  });
});
