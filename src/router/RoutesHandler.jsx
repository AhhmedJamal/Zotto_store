import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Cart from "../pages/Cart.jsx";
import Login from "../pages/Login.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import DetailsProduct from "../pages/DetailsProduct.jsx";
import Orders from "../pages/Orders.jsx";
import Account from "../pages/Account.jsx";
import Forget from "../pages/Forget.jsx";
import Favorites from "../pages/Favorites.jsx";
import MixProducts from "../pages/MixProducts.jsx";
import Search from "../pages/Search.jsx";

const RouterHandler = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,

      children: [
        {
          index: true,
          element: <MixProducts />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },

        {
          path: "/account",
          element: <Account />,
        },

        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/:name",
          element: <CategoryPage />,
        },
        {
          path: ":name/:id",
          element: <DetailsProduct />,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/forget",
      element: <Forget />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterHandler;
