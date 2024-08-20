import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shop from "./Shop";

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

vi.mock(import("../../helpers"), async (importOriginal) => {
  const imports = await importOriginal();

  const useCustomLocationState = () => {
    let items = [];
    const setItems = (newItems) => (items = newItems);

    return [items, setItems];
  };

  return { ...imports, useCustomLocationState };
});

// Link needs to be mocked because it's in NavBar
vi.mock(import("react-router-dom"), async (importOriginal) => {
  const imports = await importOriginal();

  const newLink = ({ children, to, ...props }) => {
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
});
