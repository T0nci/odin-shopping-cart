import styles from "./AddItemButton.module.css";
import CartAddLogo from "../../icons/cart_add.svg";
import PropTypes from "prop-types";

const AddItemButton = ({ item, cart, setCart, setShop }) => {
  const updateCart = () => {
    if (item.quantity < 1 || item.quantity > 999) {
      return;
    }

    const foundItem = cart.findIndex(
      (searchedItem) => searchedItem.id === item.id,
    );
    if (foundItem !== -1) {
      const newItems = cart.slice();
      newItems[foundItem].quantity += item.quantity;

      // If the quantity went over 999 reset it to 999
      if (newItems[foundItem].quantity > 999)
        newItems[foundItem].quantity = 999;

      setCart([...newItems]);
    } else setCart([...cart, { ...item }]);

    setShop((prevShop) =>
      prevShop.map((shopItem) => {
        if (item.id === shopItem.id)
          return {
            ...item,
            quantity: 0,
          };

        return shopItem;
      }),
    );
  };

  return (
    <>
      <button onClick={updateCart} className={styles.btn}>
        Add To Cart
        <img src={CartAddLogo} alt="" className={styles.icon} />
      </button>
    </>
  );
};

const ItemObjectShape = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  quantity: PropTypes.number,
};

AddItemButton.propTypes = {
  item: PropTypes.exact(ItemObjectShape),
  cart: PropTypes.arrayOf(PropTypes.exact(ItemObjectShape)).isRequired,
  setCart: PropTypes.func.isRequired,
  setShop: PropTypes.func.isRequired,
};

export default AddItemButton;
