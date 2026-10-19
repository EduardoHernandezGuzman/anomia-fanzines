import { existsSync } from "node:fs";
import path from "node:path";
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

  it("apunta a imagenes WebP con su JPG original en assets/portadas", () => {
    FANZINES.forEach((fanzine) => {
      expect(fanzine.imagen).toMatch(/^\/img\/portadas\/[A-Za-z0-9]+\.webp$/);

      const sourceName = `${path.parse(fanzine.imagen).name}.jpg`;
      const sourcePath = path.join(process.cwd(), "assets", "portadas", sourceName);

      expect(existsSync(sourcePath), `Falta ${sourceName} en assets/portadas`).toBe(true);
    });
  });
});
