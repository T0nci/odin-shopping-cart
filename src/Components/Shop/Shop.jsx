import NavBar from "../NavBar/NavBar";
import { useCustomLocationState } from "../../helpers";

const Shop = () => {
  const [items, setItems] = useCustomLocationState();

  return (
    <>
      <NavBar items={items} />
    </>
  );
};

export default Shop;
