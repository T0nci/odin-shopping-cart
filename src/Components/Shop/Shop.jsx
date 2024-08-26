import styles from "./Shop.module.css";
import QuantityInput from "../QuantityInput/QuantityInput";
import AddItemButton from "../AddItemButton/AddItemButton";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const Shop = () => {
  const [cart, setCart] = useOutletContext();
  const [shop, setShop] = useState("loading");

  useEffect(() => {
    let isActive = true;

    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (isActive) {
          setShop(
            json.map((item) => {
              return {
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                quantity: 0,
              };
            }),
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setShop("error");
      });

    return () => (isActive = false);
  }, []);

  return (
    <>
      <main>
        <div className="container">
          <header>Shop</header>
          {shop === "error" ? (
            <p className={styles.error}>An error has occurred.</p>
          ) : shop === "loading" ? (
            <p className={styles.loading}>Loading...</p>
          ) : (
            <ul className={styles.cards}>
              {shop.map((item) => {
                return (
                  <li key={item.id} className={styles.card}>
                    <img src={item.image} alt="" className={styles.image} />
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.price}>${item.price}</p>
                    <QuantityInput item={item} setItems={setShop} />
                    <AddItemButton
                      item={item}
                      cart={cart}
                      setCart={setCart}
                      setShop={setShop}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </>
  );
};

export default Shop;
