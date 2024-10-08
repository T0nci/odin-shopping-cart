import { describe, it, expect, vi } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddItemButton from "./AddItemButton";

describe("AddItemButton Component", () => {
  it("renders AddItemButton", () => {
    let container;
    act(() => {
      const { container: temp } = render(
        <AddItemButton
          item={{
            id: 0,
            title: "",
            price: 0,
            image: "",
            quantity: 0,
          }}
          cart={[]}
          setCart={() => {}}
          setShop={() => {}}
        />,
      );

      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
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
      </div>
    `);
  });

  it("can get clicked", async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();
    const mockFn1 = vi.fn();

    act(() =>
      render(
        <AddItemButton
          item={{
            id: 0,
            title: "",
            price: 0,
            image: "",
            quantity: 1,
          }}
          cart={[]}
          setCart={mockFn}
          setShop={mockFn1}
        />,
      ),
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn1).toHaveBeenCalled();
  });

  it("ignores click if the quantity is invalid", async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();
    const mockFn1 = vi.fn();

    // Button 1
    act(() =>
      render(
        <AddItemButton
          item={{
            id: 0,
            title: "",
            price: 0,
            image: "",
            quantity: 0,
          }}
          cart={[]}
          setCart={mockFn}
          setShop={mockFn1}
        />,
      ),
    );

    const button1 = screen.getByRole("button");

    await user.click(button1);

    expect(mockFn).not.toHaveBeenCalled();
    expect(mockFn1).not.toHaveBeenCalled();
    cleanup(); // cleaning up the previous button

    // Button 2
    act(() =>
      render(
        <AddItemButton
          item={{
            id: 0,
            title: "",
            price: 0,
            image: "",
            quantity: 1000,
          }}
          cart={[]}
          setCart={mockFn}
          setShop={mockFn1}
        />,
      ),
    );

    const button2 = screen.getByRole("button");

    await user.click(button2);

    expect(mockFn).not.toHaveBeenCalled();
    expect(mockFn1).not.toHaveBeenCalled();
  });

  it("updates cart with product if product isn't in cart", async () => {
    const user = userEvent.setup();

    let cart = [];
    const mockFn = vi.fn();
    mockFn.mockImplementation((newCart) => (cart = newCart));
    let shop = [
      {
        id: 0,
        title: "",
        price: 0,
        image: "",
        quantity: 1,
      },
    ];
    const mockFn1 = vi.fn();
    // This mock takes in an updater function, calls it with
    // the current shop state, and updates shop state with
    // the return value
    mockFn1.mockImplementation((fn) => (shop = fn(shop)));

    act(() =>
      render(
        <AddItemButton
          item={{
            id: 0,
            title: "",
            price: 0,
            image: "",
            quantity: 1,
          }}
          cart={cart}
          setCart={mockFn}
          setShop={mockFn1}
        />,
      ),
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(cart).toEqual([
      { id: 0, title: "", price: 0, image: "", quantity: 1 },
    ]);
    expect(shop).toEqual([
      { id: 0, title: "", price: 0, image: "", quantity: 0 },
    ]);
  });

  it("updates cart with product if product is in cart", async () => {
    const user = userEvent.setup();

    let cart = [
      {
        id: 0,
        title: "",
        price: 0,
        image: "",
        quantity: 1,
      },
    ];
    const mockFn = vi.fn();
    mockFn.mockImplementation((newCart) => (cart = newCart));
    let shop = [
      {
        id: 0,
        title: "",
        price: 0,
        image: "",
        quantity: 1,
      },
    ];
    const mockFn1 = vi.fn();
    // This mock takes in an updater function, calls it with
    // the current shop state, and updates shop state with
    // the return value
    mockFn1.mockImplementation((fn) => (shop = fn(shop)));

    act(() =>
      render(
        <AddItemButton
          item={{
            id: 0,
            title: "",
            price: 0,
            image: "",
            quantity: 1,
          }}
          cart={cart}
          setCart={mockFn}
          setShop={mockFn1}
        />,
      ),
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(cart).toEqual([
      { id: 0, title: "", price: 0, image: "", quantity: 2 },
    ]);
    expect(shop).toEqual([
      { id: 0, title: "", price: 0, image: "", quantity: 0 },
    ]);
  });
});
