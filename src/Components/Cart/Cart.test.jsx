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

// Link needs to be mocked because it's in the main container if cart is empty
vi.mock(import("react-router-dom"), async (importOriginal) => {
  const imports = await importOriginal();

  const newLink = ({ children, to, ...props }) => {
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

  // Using vitest's mock functions, we return an empty cart the second time and
  // then keep returning a cart with 1 item
  const newUseOutletContext = vi.fn();
  newUseOutletContext.mockImplementationOnce(() =>
    useState([{ id: 1, title: "", price: 1, image: "", quantity: 1 }]),
  );
  newUseOutletContext.mockImplementationOnce(() => useState([]));
  newUseOutletContext.mockImplementation(() =>
    useState([{ id: 1, title: "", price: 1, image: "", quantity: 1 }]),
  );

  return {
    ...imports,
    Link: newLink,
    useNavigate: newUseNavigate,
    useOutletContext: newUseOutletContext,
  };
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
        <main>
          <div
            class="container"
          >
            <header>
              Cart
            </header>
            <ul
              class="_cards_bd9410"
            >
              <li
                class="_card_bd9410"
              >
                <img
                  alt=""
                  class="_image_bd9410"
                  src=""
                />
                <p
                  class="_title_bd9410"
                />
                <p
                  class="_price_bd9410"
                >
                  $
                  1
                </p>
                <div
                  class="_container_0320fd"
                >
                  <p
                    class="_quantity_0320fd"
                  >
                    Quantity:
                  </p>
                  <button
                    class="_symbol-button_0320fd"
                  >
                    -
                  </button>
                  <input
                    autocomplete="off"
                    class="_input_0320fd"
                    name="quantity"
                    type="tel"
                    value="1"
                  />
                  <button
                    class="_symbol-button_0320fd"
                  >
                    +
                  </button>
                </div>
                <p
                  class="_total_bd9410"
                >
                  Total Price: $
                  1
                </p>
                <button
                  class="_remove_bd9410"
                >
                  Remove from cart
                </button>
              </li>
            </ul>
            <div>
              <p
                class="_cart-total_bd9410"
              >
                Cart Total: $
                1
              </p>
              <button
                class="_checkout_bd9410"
              >
                Checkout
                <img
                  alt=""
                  class="_checkout-icon_bd9410"
                  src="/src/icons/cart_checkout.svg"
                />
              </button>
            </div>
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

    const list = screen.getByRole("list");

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

  it("removes item from cart", async () => {
    const user = userEvent.setup();
    act(() => render(<Cart />));

    const listItem = screen.getByRole("list").firstChild;

    expect(listItem).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove from cart" }));

    expect(listItem).not.toBeInTheDocument();
  });
});
