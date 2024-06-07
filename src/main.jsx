import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import CheckInternet from "./components/CheckInternet.jsx";
import store from "./store/store.js";
import RouterHandler from "./router/RoutesHandler.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51Oa7BfHIYZ0Ho4vpqUbFG1gnLoi8ikzp2QkXLFSwmVArLXD6SzulbpQnJCLEleNltYXg20u2GtJ3QahKhsP1yzLm00DOFCvYE3"
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <CheckInternet>
        <RouterHandler />
      </CheckInternet>
    </Elements>
  </Provider>
);
