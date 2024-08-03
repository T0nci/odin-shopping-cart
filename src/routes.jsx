import App from "./Components/App/App";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
];

export default routes;
