import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "./NavBar";

// use the hoisted feature
const mocks = vi.hoisted(() => {
  return {
    handleClick: vi.fn(),
  };
});

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const imports = await importOriginal();

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

  return { ...imports, Link: newLink };
});

describe("NavBar component", () => {
  it("renders NavBar", () => {
    let container;
    act(() => {
      const { container: newContainer } = render(<NavBar items={[]} />);

      container = newContainer;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <nav>
          <h1>
            FakeStore
          </h1>
          <ul>
            <li>
              <a
                href="/"
                state=""
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/shop"
                state=""
              >
                Shop
              </a>
            </li>
          </ul>
          <div>
            <a
              aria-label="Cart"
              href="/cart"
              state=""
            >
              <img
                alt=""
                src="/src/icons/cart.svg"
              />
            </a>
            <div>
              #
            </div>
          </div>
        </nav>
      </div>
    `);
  });

  it("handles clicks correctly", async () => {
    const user = userEvent.setup();

    act(() => {
      render(<NavBar items={[]} />);
    });

    const homeLink = screen.getByRole("link", { name: "Home" });
    const shopLink = screen.getByRole("link", { name: "Shop" });
    const cartLink = screen.getByRole("link", { name: "Cart" });

    await user.click(homeLink);
    expect(mocks.handleClick).toHaveBeenCalledWith("/");

    await user.click(shopLink);
    expect(mocks.handleClick).toHaveBeenCalledWith("/shop");

    await user.click(cartLink);
    expect(mocks.handleClick).toHaveBeenCalledWith("/cart");
  });
});
