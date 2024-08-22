import PropTypes from "prop-types";

const QuantityInput = ({ item, setShop }) => {
  const handleChange = (e) => {
    const string = e.target.value;

    if (string.length === 0)
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
    else if (/^[0-9]{1,3}$/.test(string))
      setShop((prevShop) =>
        prevShop.map((shopItem) => {
          if (item.id === shopItem.id)
            return {
              ...item,
              quantity: parseInt(string),
            };

          return shopItem;
        }),
      );
    // The above regex ensures that there are only numbers from 0 up to 999
  };

  const handleQuantityClick = (e) => {
    const operation = e.target.textContent;

    if (operation === "-") {
      if (item.quantity === 0) return;

      setShop((prevShop) =>
        prevShop.map((shopItem) => {
          if (item.id === shopItem.id)
            return { ...item, quantity: item.quantity - 1 };

          return shopItem;
        }),
      );
    } else if (operation === "+") {
      if (item.quantity === 999) return;

      setShop((prevShop) =>
        prevShop.map((shopItem) => {
          if (item.id === shopItem.id)
            return { ...item, quantity: item.quantity + 1 };

          return shopItem;
        }),
      );
    }
  };

  return (
    <>
      <div>
        <p>Quantity:</p>
        <button onClick={handleQuantityClick}>-</button>
        <input
          type="tel"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
        />
        <button onClick={handleQuantityClick}>+</button>
      </div>
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

QuantityInput.propTypes = {
  item: PropTypes.exact(ItemObjectShape).isRequired,
  setShop: PropTypes.func.isRequired,
};

export default QuantityInput;
