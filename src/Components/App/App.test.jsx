import { describe, it, expect, vi } from "vitest";
import { render, act } from "@testing-library/react";
import App from "./App";

vi.mock(import("../../helpers"), async (importOriginal) => {
  const imports = await importOriginal();

  const useCustomLocationState = () => {
    let cart = [];
    const setCart = (newCart) => (cart = newCart);

    return [cart, setCart];
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

describe("App component", () => {
  it("renders App", () => {
    let container = null;
    act(() => {
      const { container: temp } = render(<App />);

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
              0
            </div>
          </div>
        </nav>
        <main>
          <header>
            Home
          </header>
          <h1>
            Welcome to FakeStore!
          </h1>
          <p>
            Discover a world of curated, high-quality products designed to make your life easier and more enjoyable. At FakeStore, we’re passionate about bringing you the latest trends and timeless essentials at unbeatable prices. Whether you’re shopping for cutting-edge gadgets, stylish fashion, or unique home decor, our diverse selection ensures that there’s something for everyone. Browse our collections, enjoy seamless shopping experiences, and let us help you find exactly what you need. Dive into FakeStore today—where exceptional finds are just a click away!
          </p>
        </main>
      </div>
    `);
  });
});
