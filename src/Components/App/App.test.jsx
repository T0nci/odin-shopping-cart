import { describe, it, expect } from "vitest";
import { render, act } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders App", () => {
    let container = null;
    act(() => {
      const { container: temp } = render(<App />);

      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <main>
          <div
            class="container"
          >
            <header>
              Home
            </header>
            <h1
              class="_heading_d249f9"
            >
              Welcome to FakeStore!
            </h1>
            <p
              class="_paragraph_d249f9"
            >
              Discover a world of curated, high-quality products designed to make your life easier and more enjoyable. At FakeStore, we’re passionate about bringing you the latest trends and timeless essentials at unbeatable prices. Whether you’re shopping for cutting-edge gadgets, stylish fashion, or unique home decor, our diverse selection ensures that there’s something for everyone. Browse our collections, enjoy seamless shopping experiences, and let us help you find exactly what you need. Dive into FakeStore today—where exceptional finds are just a click away!
            </p>
          </div>
        </main>
      </div>
    `);
  });
});
