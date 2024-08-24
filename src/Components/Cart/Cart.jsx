import NavBar from "../NavBar/NavBar";
import QuantityInput from "../QuantityInput/QuantityInput";
import { useCustomLocationState, roundNumber } from "../../helpers";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useCustomLocationState();
  const navigate = useNavigate();

  return (
    <>
      <NavBar cart={cart} />
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
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Cart;
