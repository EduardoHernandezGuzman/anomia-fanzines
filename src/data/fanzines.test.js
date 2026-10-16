import { describe, expect, it } from "vitest";
import { FANZINES, FANZINE_CATEGORIES } from "./fanzines";

describe("fanzines", () => {
  it("tiene 28 entradas con todos los campos completos", () => {
    expect(FANZINES).toHaveLength(28);

    FANZINES.forEach((fanzine) => {
      expect(fanzine).toMatchObject({
        id: expect.any(Number),
        titulo: expect.any(String),
        fecha: expect.any(String),
        imagen: expect.any(String),
        enlace: expect.any(String),
        categoria: expect.any(String),
      });
    });
  });

  it("usa solo las categorías declaradas", () => {
    FANZINES.forEach((fanzine) => {
      expect(FANZINE_CATEGORIES).toContain(fanzine.categoria);
    });
  });

  it("no repite identificadores", () => {
    const ids = FANZINES.map((fanzine) => fanzine.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
