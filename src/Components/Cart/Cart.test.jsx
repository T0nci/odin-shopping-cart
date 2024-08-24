import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart";
import { useState } from "react";

const mocks = vi.hoisted(() => {
  const link = vi.fn();

  return {
    link,
  };
});

vi.mock(import("../../helpers"), async (importOriginal) => {
  const imports = await importOriginal();

  // Using vitest's mock functions, we return an empty cart the second time and
  // then keep returning a cart with 1 item(replaced conditional call of
  // useState and constant call of useState with only one initial state)
  const mockFn = vi.fn();
  mockFn.mockImplementationOnce(() =>
    useState([{ id: 1, title: "", price: 1, image: "", quantity: 1 }]),
  );
  mockFn.mockImplementationOnce(() => useState([]));
  mockFn.mockImplementation(() =>
    useState([{ id: 1, title: "", price: 1, image: "", quantity: 1 }]),
  );

  return { ...imports, useCustomLocationState: mockFn };
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
          mocks.link(to);
        }}
        {...props}
      >
        {children}
      </a>
    );
  };

  const newUseNavigate = () => mocks.link;

  return { ...imports, Link: newLink, useNavigate: newUseNavigate };
});

describe("Cart Component", () => {
  it("renders", () => {
    let container;
    act(() => {
      const { container: temp } = render(<Cart />);

      container = temp;
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
              1
            </div>
          </div>
        </nav>
        <main>
          <ul>
            <li>
              <img
                alt=""
                height="200"
                src=""
                width="200"
              />
              <p />
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
                  autocomplete="off"
                  name="quantity"
                  type="tel"
                  value="1"
                />
                <button>
                  +
                </button>
              </div>
              <p>
                Total Price: $
                1
              </p>
            </li>
          </ul>
          <div>
            <p>
              Cart Total: $
              1
            </p>
            <button>
              Checkout
            </button>
          </div>
        </main>
      </div>
    `);
  });

  it("renders a link when there is no item", async () => {
    const user = userEvent.setup();
    act(() => render(<Cart />));

    await user.click(screen.getByRole("link", { name: "shopping" }));

    expect(mocks.link).toHaveBeenCalledWith("/shop");
  });

  it("clears cart and navigates to home when checkout is clicked", async () => {
    const user = userEvent.setup();
    act(() => render(<Cart />));

    const list = screen.getByRole("main").firstChild;

    expect(list).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Checkout" }));

    expect(list).not.toBeInTheDocument();
    expect(mocks.link).toHaveBeenCalledWith("/");
  });

  it("updates quantity successfully", async () => {
    const user = userEvent.setup();
    act(() => render(<Cart />));

    const input = screen.getByRole("textbox");

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(parseInt(input.value)).toBe(2);

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(parseInt(input.value)).toBe(1);

    await user.type(input, "2");
    expect(parseInt(input.value)).toBe(12);

    await user.type(input, "{backspace}testing .sa?!das{backspace}");
    expect(parseInt(input.value)).toBe(0);
  });
});
