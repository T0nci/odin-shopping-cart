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

  // eslint-disable-next-line no-unused-vars
  const newLink = ({ children, to, state: _, ...props }) => {
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
      const { container: newContainer } = render(<NavBar cart={[]} />);

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
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/shop"
              >
                Shop
              </a>
            </li>
          </ul>
          <div>
            <a
              aria-label="Cart"
              href="/cart"
            >
              <img
                alt=""
                src="/src/icons/cart.svg"
              />
            </a>
            <div
              data-testid="cart-size"
            >
              0
            </div>
          </div>
        </nav>
      </div>
    `);
  });

  it("handles clicks correctly", async () => {
    const user = userEvent.setup();

    act(() => {
      render(<NavBar cart={[]} />);
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
    const cart = [
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
    ];

    act(() => render(<NavBar cart={cart} />));

    expect(screen.getByTestId("cart-size").textContent).toBe("3");
  });
});
