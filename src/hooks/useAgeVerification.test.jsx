import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAgeVerification } from "./useAgeVerification";

describe("useAgeVerification", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("empieza sin verificar", () => {
    const { result } = renderHook(() => useAgeVerification());

    expect(result.current.isVerified).toBe(false);
  });

  it("persiste la verificación en sessionStorage", () => {
    const { result } = renderHook(() => useAgeVerification());

    act(() => {
      result.current.confirmAge(true);
    });

    expect(result.current.isVerified).toBe(true);
    expect(window.sessionStorage.getItem("anomia-age-verified")).toBe("true");
  });

  it("recupera una verificación previa de la sesión", () => {
    window.sessionStorage.setItem("anomia-age-verified", "true");

    const { result } = renderHook(() => useAgeVerification());

    expect(result.current.isVerified).toBe(true);
  });

  it("redirige a Google cuando no es mayor de edad", () => {
    const location = { href: "" };
    vi.stubGlobal("location", location);

    const { result } = renderHook(() => useAgeVerification());

    act(() => {
      result.current.confirmAge(false);
    });

    expect(location.href).toBe("https://www.google.com");
    expect(result.current.isVerified).toBe(false);
  });
});
