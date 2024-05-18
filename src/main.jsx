import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import CheckInternet from "./components/CheckInternet.jsx";
import store from "./store/store.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import RouterHandler from "./router/RoutesHandler.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Render the application with transitions
ReactDOM.createRoot(document.getElementById("root")).render(
  <PayPalScriptProvider
    options={{
      "client-id":
        "AahhqPNBFsoMNGiboszlRBJoaNylWvM1LZr3uwZw9wDU0X83Ra_lJj6fJ158d2dpiGSks8gey4MIRse-",
    }}
  >
    <Provider store={store}>
      <CheckInternet>
        <RouterHandler />
      </CheckInternet>
    </Provider>
  </PayPalScriptProvider>
);
