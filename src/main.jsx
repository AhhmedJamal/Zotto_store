import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import CheckInternet from "./components/CheckInternet.jsx";
import store from "./store/store.js";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import RouterHandler from "./router/RoutesHandler.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const stripePromise = loadStripe("pk_test_51Oa7BfHIYZ0Ho4vpqUbFG1gnLoi8ikzp2QkXLFSwmVArLXD6SzulbpQnJCLEleNltYXg20u2GtJ3QahKhsP1yzLm00DOFCvYE3");
ReactDOM.createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <CheckInternet>
        <RouterHandler />
      </CheckInternet>
    </Provider>
  </Elements>
);

// <PayPalScriptProvider
//   options={{
//     "client-id":
//       "AahhqPNBFsoMNGiboszlRBJoaNylWvM1LZr3uwZw9wDU0X83Ra_lJj6fJ158d2dpiGSks8gey4MIRse-",
//   }}
// >
// </PayPalScriptProvider>
