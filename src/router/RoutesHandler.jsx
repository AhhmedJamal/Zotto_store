import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Cart from "../pages/Cart.jsx";
import Login from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Home from "../pages/Home.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import DetailsProduct from "../pages/DetailsProduct.jsx";
import Orders from "../pages/Orders.jsx";
import Checkout from "../pages/Checkout.jsx";
import Account from "../pages/Account.jsx";
import Forget from "../pages/Forget.jsx";
import Favorites from "../pages/Favorites.jsx";

const RouterHandler = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },

        {
          path: "account",
          element: <Account />,
        },

        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
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
      path: "checkout",
      element: <Checkout />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signUp",
      element: <SignUp />,
    },
    {
      path: "forget",
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
