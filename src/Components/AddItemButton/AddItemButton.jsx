import CartAddLogo from "../../icons/cart_add.svg";
import PropTypes from "prop-types";

const AddItemButton = ({ item, items, setItems, setShop }) => {
  const updateCart = () => {
    if (item.quantity < 1 || item.quantity > 999) {
      return;
    }

    const foundItem = items.findIndex(
      (searchedItem) => searchedItem.id === item.id,
    );
    if (foundItem !== -1) {
      const newItems = items.slice();
      newItems[foundItem].quantity += item.quantity;
      setItems([...newItems]);
    } else setItems([...items, { ...item }]);

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
      <button onClick={updateCart}>
        Add Item
        <img src={CartAddLogo} alt="" />
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
  items: PropTypes.arrayOf(PropTypes.exact(ItemObjectShape)).isRequired,
  setItems: PropTypes.func.isRequired,
  setShop: PropTypes.func.isRequired,
};

export default AddItemButton;
