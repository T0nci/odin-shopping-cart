import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "./ErrorPage";

const mocks = vi.hoisted(() => {
  return {
    handleClick: vi.fn(),
  };
});

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const imports = await importOriginal();

  const newUseRouteError = vi.fn();
  newUseRouteError.mockImplementationOnce(() => null);
  newUseRouteError.mockImplementationOnce(() => new Error("Internal error"));
  newUseRouteError.mockImplementationOnce(() => ({
    status: 404,
    statusText: "Not found",
  }));
  newUseRouteError.mockImplementationOnce(() => null);

  const newLink = ({ children, to, ...props }) => {
    return (
      <a
        href={to}
        onClick={(e) => {
          e.preventDefault();
          mocks.handleClick(to);
        }}
        {...props}
      >
        {children}
      </a>
    );
  };

  return { ...imports, useRouteError: newUseRouteError, Link: newLink };
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
          class="_wrapper_804c82"
        >
          <p
            class="_error_804c82"
            data-testid="error"
          />
          <a
            class="_link_804c82"
            href="/"
          >
            Go back to home
          </a>
        </div>
      </div>
    `);
  });

  it("renders an error correctly", () => {
    act(() => {
      render(<ErrorPage />);
    });

    const p = screen.getByTestId("error");

    expect(p.textContent).toBe("Error: Internal error");
  });

  it("renders a response error correctly", () => {
    act(() => {
      render(<ErrorPage />);
    });

    const p = screen.getByTestId("error");

    expect(p.textContent).toBe("404: Not found");
  });

  it("renders clickable link", async () => {
    const user = userEvent.setup();

    act(() => {
      render(<ErrorPage />);
    });

    await user.click(screen.getByRole("link"));

    expect(mocks.handleClick).toHaveBeenCalledWith("/");
  });
});
