import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shop from "./Shop";
import { useState } from "react";

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

vi.mock(import("../../helpers"), async (importOriginal) => {
  const imports = await importOriginal();

  const useCustomLocationState = () => {
    return useState([]);
  };

  return { ...imports, useCustomLocationState };
});

// Link needs to be mocked because it's in NavBar
vi.mock(import("react-router-dom"), async (importOriginal) => {
  const imports = await importOriginal();

  // eslint-disable-next-line no-unused-vars
  const newLink = ({ children, to, state: _, ...props }) => {
    return (
      <a
        href={to}
        onClick={(e) => {
          e.preventDefault();
        }}
        {...props}
      >
        {children}
      </a>
    );
  };

  return { ...imports, Link: newLink };
});

describe("Shop Component", () => {
  it("renders Shop", async () => {
    const fetchedItems = [
      {
        id: 1,
        title: "a",
        price: 1,
        image: "example-url",
      },
      {
        id: 2,
        title: "b",
        price: 2,
        image: "example-url",
      },
      {
        id: 3,
        title: "c",
        price: 3,
        image: "example-url",
      },
    ];

    const json = () => {
      return Promise.resolve(fetchedItems);
    };

    fetch.mockResolvedValueOnce({ json });

    let container;
    await act(() => {
      const { container: newContainer } = render(<Shop />);

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
        <main>
          <header>
            Shop
          </header>
          <ul>
            <li>
              <img
                alt=""
                height="200"
                src="example-url"
                width="200"
              />
              <p>
                a
              </p>
              <p>
                $
                1
              </p>
              <div>
                <p>
                  Quantity:
                </p>
                <button>
                  -
                </button>
                <input
                  name="quantity"
                  type="tel"
                  value="0"
                />
                <button>
                  +
                </button>
              </div>
              <button>
                Add To Cart
                <img
                  alt=""
                  src="/src/icons/cart_add.svg"
                />
              </button>
            </li>
            <li>
              <img
                alt=""
                height="200"
                src="example-url"
                width="200"
              />
              <p>
                b
              </p>
              <p>
                $
                2
              </p>
              <div>
                <p>
                  Quantity:
                </p>
                <button>
                  -
                </button>
                <input
                  name="quantity"
                  type="tel"
                  value="0"
                />
                <button>
                  +
                </button>
              </div>
              <button>
                Add To Cart
                <img
                  alt=""
                  src="/src/icons/cart_add.svg"
                />
              </button>
            </li>
            <li>
              <img
                alt=""
                height="200"
                src="example-url"
                width="200"
              />
              <p>
                c
              </p>
              <p>
                $
                3
              </p>
              <div>
                <p>
                  Quantity:
                </p>
                <button>
                  -
                </button>
                <input
                  name="quantity"
                  type="tel"
                  value="0"
                />
                <button>
                  +
                </button>
              </div>
              <button>
                Add To Cart
                <img
                  alt=""
                  src="/src/icons/cart_add.svg"
                />
              </button>
            </li>
          </ul>
        </main>
      </div>
    `);
  });

  it("renders Shop when there's an error", async () => {
    fetch.mockRejectedValueOnce(new Error());

    let container;
    await act(() => {
      const { container: newContainer } = render(<Shop />);

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
        <main>
          <header>
            Shop
          </header>
          <p>
            An error has occurred.
          </p>
        </main>
      </div>
    `);
  });

  it("adds an item to cart correctly", async () => {
    const user = userEvent.setup();

    const fetchedItems = [
      {
        id: 1,
        title: "a",
        price: 1,
        image: "example-url",
      },
    ];

    const json = () => {
      return Promise.resolve(fetchedItems);
    };

    fetch.mockResolvedValueOnce({ json });

    await act(() => render(<Shop />));

    const input = screen.getByRole("textbox");

    await user.type(input, "1");
    expect(parseInt(input.value)).toBe(1);

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(parseInt(input.value)).toBe(2);

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(parseInt(input.value)).toBe(1); // Quantity needs to be 1 to add to cart

    await user.click(screen.getByRole("button", { name: "Add To Cart" }));
    expect(parseInt(input.value)).toBe(0);
    expect(parseInt(screen.getByTestId("cart-size").textContent)).toBe(1);
  });
});
