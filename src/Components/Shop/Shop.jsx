import NavBar from "../NavBar/NavBar";
import { useCustomLocationState } from "../../helpers";
import { useEffect, useState } from "react";

const Shop = () => {
  const [items, setItems] = useCustomLocationState();
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
      <NavBar items={items} />
      <main>
        <header>Shop</header>
        {shop === "error" ? (
          <p>An error has occurred.</p>
        ) : shop === "loading" ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {shop.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.image} alt="" width="200" height="200" />
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
};

export default Shop;
