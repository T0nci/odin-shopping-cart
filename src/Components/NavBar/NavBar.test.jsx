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

vi.mock(import("react"), async (importOriginal) => {
  const imports = await importOriginal();

  const newUseState = vi.fn();
  newUseState.mockImplementationOnce(() => [[], () => {}]);
  newUseState.mockImplementationOnce(() => [[], () => {}]);
  newUseState.mockImplementationOnce(() => [
    [
      {
        id: 1,
        title: "a",
        price: 1,
        image: "example-url",
        quantity: 1,
      },
      {
        id: 2,
        title: "b",
        price: 2,
        image: "example-url",
        quantity: 2,
      },
      {
        id: 3,
        title: "c",
        price: 3,
        image: "example-url",
        quantity: 3,
      },
    ],
    () => {},
  ]);

  return { ...imports, useState: newUseState };
});

describe("NavBar component", () => {
  it("renders NavBar", () => {
    let container;
    act(() => {
      const { container: newContainer } = render(<NavBar />);

      container = newContainer;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <nav
          class="_navigation_7ceb2b"
        >
          <div
            class="container _nav_7ceb2b"
          >
            <h1
              class="_heading_7ceb2b"
            >
              <span
                class="_span_7ceb2b"
              >
                Fake
              </span>
              Store
            </h1>
            <ul
              class="_nav-links_7ceb2b"
            >
              <li>
                <a
                  class="_nav-link_7ceb2b"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  class="_nav-link_7ceb2b"
                  href="/shop"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  aria-label="Cart"
                  class="_cart_7ceb2b"
                  href="/cart"
                >
                  <img
                    alt=""
                    class="_cart-icon_7ceb2b"
                    src="/src/icons/cart.svg"
                  />
                  <div
                    class="_cart-size_7ceb2b"
                    data-testid="cart-size"
                  >
                    0
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    `);
  });

  it("handles clicks correctly", async () => {
    const user = userEvent.setup();

    act(() => {
      render(<NavBar />);
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

  it("shows correct number of items in cart", async () => {
    act(() => render(<NavBar />));

    expect(screen.getByTestId("cart-size").textContent).toBe("3");
  });
});
