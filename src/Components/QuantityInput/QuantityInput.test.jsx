import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantityInput from "./QuantityInput";

describe("QuantityInput component", () => {
  it("renders QuantityInput", () => {
    let container;
    act(() => {
      const { container: temp } = render(
        <QuantityInput
          item={{ id: 0, title: "", price: 0, image: "", quantity: 0 }}
          setItems={() => {}}
        />,
      );

      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
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
      </div>
    `);
  });

  it("can be interacted with", async () => {
    const user = userEvent.setup();
    const item = {
      id: 0,
      title: "",
      price: 0,
      image: "",
      quantity: 1,
    };
    const mockFn = vi.fn();

    act(() => render(<QuantityInput item={item} setItems={mockFn} />));

    const plusButton = screen.getByRole("button", { name: "+" });
    const minusButton = screen.getByRole("button", { name: "-" });
    const input = screen.getByRole("textbox");

    await user.click(plusButton);
    await user.click(minusButton);
    await user.type(input, "1");

    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it("updates quantity correctly", async () => {
    const user = userEvent.setup();

    let item = {
      id: 0,
      title: "",
      price: 0,
      image: "",
      quantity: 0,
    };

    let shop = [item];
    const mockFn = vi.fn();
    mockFn.mockImplementation((fn) => {
      shop = fn(shop);
      item = shop[0]; // This is needed because it is passed in the component
      // and because of that we need to "rerender" it so it shows correct quantity
    });

    let rerender;
    act(() => {
      const { rerender: temp } = render(
        <QuantityInput item={item} setItems={mockFn} />,
      );

      rerender = temp;
    });

    const plusButton = screen.getByRole("button", { name: "+" });
    await user.click(plusButton);
    expect(shop[0].quantity).toBe(1);
    // rerendering so new item value is passed in(using new quantity) instead of 0(now 1)
    rerender(<QuantityInput item={item} setItems={mockFn} />);

    const minusButton = screen.getByRole("button", { name: "-" });
    await user.click(minusButton);
    expect(shop[0].quantity).toBe(0);
    // rerendering so new item value is passed in(using new quantity) instead of 1(now 0)
    rerender(<QuantityInput item={item} setItems={mockFn} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "1");
    // rerendering so new item value is passed in(using new quantity) instead of 0(now 1)
    rerender(<QuantityInput item={item} setItems={mockFn} />);
    await user.type(input, "2");
    expect(shop[0].quantity).toBe(12);
  });
});
