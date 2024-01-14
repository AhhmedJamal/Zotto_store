import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
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
import Settings from "./pages/Settings.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Favorite from "./pages/Favorite.jsx";
import DetailsProduct from "./pages/DetailsProduct.jsx";
import Orders from "./pages/Orders.jsx";
import Checkout from "./pages/Checkout.jsx";
import Account from "./pages/Account.jsx";
import Forget from "./pages/Forget.jsx";

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
        path: "settings",
        element: <Settings />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },

      {
        path: "orders",
        element: <Orders />,
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
    <Provider store={store}>
      <ThemeProvider>
        <CheckInternet>
          <RouterProvider router={router} />
        </CheckInternet>
      </ThemeProvider>
    </Provider>
  </>
);
