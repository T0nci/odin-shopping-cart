import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CartLogo from "../../icons/cart.svg";

const NavBar = ({ items }) => {
  return (
    <>
      <nav>
        <h1>FakeStore</h1>
        <ul>
          <li>
            <Link to="/" state={items}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" state={items}>
              Shop
            </Link>
          </li>
        </ul>
        <div>
          <Link to="/cart" state={items} aria-label="Cart">
            <img src={CartLogo} alt="" />
          </Link>
          <div>{items.length}</div>
        </div>
      </nav>
    </>
  );
};

NavBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavBar;
