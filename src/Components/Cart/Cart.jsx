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
        {cart.length === 0 ? (
          <p>
            Your Cart is empty. Start <Link to="/shop">shopping</Link> now!
          </p>
        ) : (
          <>
            <ul>
              {cart.map((item) => {
                return (
                  <li key={item.id}>
                    <img src={item.image} alt="" width="200" height="200" />
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    <QuantityInput
                      item={item}
                      setItems={setCart}
                      deletion={"y"}
                    />
                    <p>
                      Total Price: ${roundNumber(item.price * item.quantity, 3)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div>
              <p>
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
                onClick={() => {
                  setCart([]);
                  navigate("/");
                }}
              >
                Checkout
                <img src={CartCheckoutLogo} alt="" />
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Cart;
