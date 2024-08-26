import styles from "./NavBar.module.css";
import "../../global.css";
import { Link, Outlet } from "react-router-dom";
import CartLogo from "../../icons/cart.svg";
import { useState } from "react";

const NavBar = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <nav className={styles.navigation}>
        <div className={"container " + styles.nav}>
          <h1 className={styles.heading}>
            <span className={styles.span}>Fake</span>Store
          </h1>
          <ul className={styles["nav-links"]}>
            <li>
              <Link to="/" className={styles["nav-link"]}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className={styles["nav-link"]}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/cart" aria-label="Cart" className={styles.cart}>
                <img src={CartLogo} alt="" className={styles["cart-icon"]} />
                <div data-testid="cart-size" className={styles["cart-size"]}>
                  {cart.length}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet context={[cart, setCart]} />
    </>
  );
};

export default NavBar;
