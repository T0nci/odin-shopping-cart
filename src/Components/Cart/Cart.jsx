import NavBar from "../NavBar/NavBar";
import { useCustomLocationState } from "../../helpers";

const Cart = () => {
  const [items, setItems] = useCustomLocationState();

  return (
    <>
      <NavBar items={items} />
    </>
  );
};

export default Cart;
