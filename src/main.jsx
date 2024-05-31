import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import CheckInternet from "./components/CheckInternet.jsx";
import store from "./store/store.js";
import RouterHandler from "./router/RoutesHandler.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CheckInternet>
      <RouterHandler />
    </CheckInternet>
  </Provider>
);
