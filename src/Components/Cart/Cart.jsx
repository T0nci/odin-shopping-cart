import styles from "./Cart.module.css";
import QuantityInput from "../QuantityInput/QuantityInput";
import CartCheckoutLogo from "../../icons/cart_checkout.svg";
import { roundNumber } from "../../helpers";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <main>
        <div className="container">
          <header>Cart</header>
          {cart.length === 0 ? (
            <p className={styles.empty}>
              Your Cart is empty. Start{" "}
              <Link to="/shop" className={styles["shop-link"]}>
                shopping
              </Link>{" "}
              now!
            </p>
          ) : (
            <>
              <ul className={styles.cards}>
                {cart.map((item) => {
                  return (
                    <li key={item.id} className={styles.card}>
                      <img src={item.image} alt="" className={styles.image} />
                      <p className={styles.title}>{item.title}</p>
                      <p className={styles.price}>${item.price}</p>
                      <QuantityInput
                        item={item}
                        setItems={setCart}
                        deletion={"y"}
                      />
                      <p className={styles.total}>
                        Total Price: $
                        {roundNumber(item.price * item.quantity, 3)}
                      </p>
                      <button
                        className={styles.remove}
                        onClick={() =>
                          setCart(
                            cart.filter((cartItem) => cartItem.id !== item.id),
                          )
                        }
                      >
                        Remove from cart
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div>
                <p className={styles["cart-total"]}>
                  Cart Total: $
                  {roundNumber(
                    cart.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0,
                    ),
                    3,
                  )}
                </p>
                <button
                  className={styles.checkout}
                  onClick={() => {
                    setCart([]);
                    navigate("/");
                  }}
                >
                  Checkout
                  <img
                    src={CartCheckoutLogo}
                    alt=""
                    className={styles["checkout-icon"]}
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
