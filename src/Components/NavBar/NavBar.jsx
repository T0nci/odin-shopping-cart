import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CartLogo from "../../icons/cart.svg";

const NavBar = ({ cart }) => {
  return (
    <>
      <nav>
        <h1>FakeStore</h1>
        <ul>
          <li>
            <Link to="/" state={cart}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" state={cart}>
              Shop
            </Link>
          </li>
        </ul>
        <div>
          <Link to="/cart" state={cart} aria-label="Cart">
            <img src={CartLogo} alt="" />
          </Link>
          <div data-testid="cart-size">{cart.length}</div>
        </div>
      </nav>
    </>
  );
};

NavBar.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      quantity: PropTypes.number,
    }),
  ).isRequired,
};

export default NavBar;
