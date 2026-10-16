import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AgeVerification } from "./AgeVerification";

describe("AgeVerification", () => {
  it("confirma cuando se pulsa Sí", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<AgeVerification onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: "Sí" }));

    expect(onConfirm).toHaveBeenCalledWith(true);
  });

  it("rechaza cuando se pulsa No", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<AgeVerification onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: "No" }));

    expect(onConfirm).toHaveBeenCalledWith(false);
  });
});
