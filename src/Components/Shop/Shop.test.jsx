import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shop from "./Shop";

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

const mocks = vi.hoisted(() => ({ setCart: vi.fn() }));

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const imports = await importOriginal();

  const newUseOutletContext = () => [[], mocks.setCart];

  return { ...imports, useOutletContext: newUseOutletContext };
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
        <main>
          <div
            class="container"
          >
            <header>
              Shop
            </header>
            <ul
              class="_cards_214c00"
            >
              <li
                class="_card_214c00"
              >
                <img
                  alt=""
                  class="_image_214c00"
                  src="example-url"
                />
                <p
                  class="_title_214c00"
                >
                  a
                </p>
                <p
                  class="_price_214c00"
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
                    value="0"
                  />
                  <button
                    class="_symbol-button_0320fd"
                  >
                    +
                  </button>
                </div>
                <button
                  class="_btn_9fbe79"
                >
                  Add To Cart
                  <img
                    alt=""
                    class="_icon_9fbe79"
                    src="/src/icons/cart_add.svg"
                  />
                </button>
              </li>
              <li
                class="_card_214c00"
              >
                <img
                  alt=""
                  class="_image_214c00"
                  src="example-url"
                />
                <p
                  class="_title_214c00"
                >
                  b
                </p>
                <p
                  class="_price_214c00"
                >
                  $
                  2
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
                    value="0"
                  />
                  <button
                    class="_symbol-button_0320fd"
                  >
                    +
                  </button>
                </div>
                <button
                  class="_btn_9fbe79"
                >
                  Add To Cart
                  <img
                    alt=""
                    class="_icon_9fbe79"
                    src="/src/icons/cart_add.svg"
                  />
                </button>
              </li>
              <li
                class="_card_214c00"
              >
                <img
                  alt=""
                  class="_image_214c00"
                  src="example-url"
                />
                <p
                  class="_title_214c00"
                >
                  c
                </p>
                <p
                  class="_price_214c00"
                >
                  $
                  3
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
                    value="0"
                  />
                  <button
                    class="_symbol-button_0320fd"
                  >
                    +
                  </button>
                </div>
                <button
                  class="_btn_9fbe79"
                >
                  Add To Cart
                  <img
                    alt=""
                    class="_icon_9fbe79"
                    src="/src/icons/cart_add.svg"
                  />
                </button>
              </li>
            </ul>
          </div>
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
        <main>
          <div
            class="container"
          >
            <header>
              Shop
            </header>
            <p
              class="_error_214c00"
            >
              An error has occurred.
            </p>
          </div>
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
    // Expect the first argument to the last call to have a length of 1
    expect(mocks.setCart.mock.lastCall[0].length).toBe(1);
  });
});
