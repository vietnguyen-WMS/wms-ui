import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me - count: 0")).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Click - count: 0");

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveTextContent("Click - count: 1");
  });
});
