import { Link, Outlet } from "react-router-dom";
import CartLogo from "../../icons/cart.svg";
import { useState } from "react";

const NavBar = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
        <h1>FakeStore</h1>
        <Link to="/cart" aria-label="Cart">
          <img src={CartLogo} alt="" />
          <div data-testid="cart-size">{cart.length}</div>
        </Link>
      </nav>
      <Outlet context={[cart, setCart]} />
    </>
  );
};

export default NavBar;
