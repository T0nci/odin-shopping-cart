import App from "./Components/App/App";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "shop",
    element: <Shop />,
    errorElement: <ErrorPage />,
  },
  {
    path: "cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
