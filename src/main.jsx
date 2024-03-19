import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Import your components and store
import App from "./App.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CheckInternet from "./components/CheckInternet.jsx";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import DetailsProduct from "./pages/DetailsProduct.jsx";
import Orders from "./pages/Orders.jsx";
import Checkout from "./pages/Checkout.jsx";
import Account from "./pages/Account.jsx";
import Forget from "./pages/Forget.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Favorites from "./pages/Favorites.jsx";

// Create BrowserRouter
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

// Render the application with transitions
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <PayPalScriptProvider
      options={{
        "client-id":
          "AahhqPNBFsoMNGiboszlRBJoaNylWvM1LZr3uwZw9wDU0X83Ra_lJj6fJ158d2dpiGSks8gey4MIRse-",
      }}
    >
      <Provider store={store}>
        <CheckInternet>
          <RouterProvider router={router} />
        </CheckInternet>
      </Provider>
    </PayPalScriptProvider>
  </>
);
