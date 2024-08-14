import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const imports = await importOriginal();

  const newUseRouteError = vi.fn();
  newUseRouteError.mockImplementationOnce(() => null);
  newUseRouteError.mockImplementationOnce(() => new Error("Internal error"));
  newUseRouteError.mockImplementationOnce(() => ({
    status: 404,
    statusText: "Not found",
  }));

  return { ...imports, useRouteError: newUseRouteError };
});

describe("ErrorPage component", () => {
  it("renders ErrorPage component", () => {
    let container;
    act(() => {
      const { container: newContainer } = render(<ErrorPage />);

      container = newContainer;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="error"
        />
      </div>
    `);
  });

  it("renders an error correctly", () => {
    act(() => {
      render(<ErrorPage />);
    });

    const div = screen.getByTestId("error");

    expect(div.textContent).toBe("Error: Internal error");
  });

  it("renders a response error correctly", () => {
    act(() => {
      render(<ErrorPage />);
    });

    const div = screen.getByTestId("error");

    expect(div.textContent).toBe("404: Not found");
  });
});
