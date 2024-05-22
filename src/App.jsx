import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import Categories from "./components/Categories";
import BottomBar from "./components/BottomBar";
import { useDispatch } from "react-redux";
import { GetDataUser } from "./store/user/user";

const App = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Prevent navigating back in the browser
    const handleBackButton = () => history.pushState(null, null, document.URL);
    window.addEventListener("popstate", handleBackButton);

    // If there is no user token, redirect the user to the login page
    if (!localStorage.getItem("token")) {
      return router("/login");
    }

    // Check if a user is found
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        dispatch(GetDataUser(user.email));
      } catch (error) {
        console.error("Error fetching document:", error);
      }

      if (localStorage.getItem("token") !== user?.uid) {
        toast.error("Authorization Failed !!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setTimeout(() => router("/login"), 5000);
      }
    });

    // Unsubscribe when the component is removed
    return () => {
      window.removeEventListener("popstate", handleBackButton);
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container m-auto overflow-y-scroll h-[100vh] sm:h-screen pb-16 sm:pb-0">
      <ToastContainer />
      <NavBar />
      <Categories />
      <Outlet />
      <BottomBar />
    </div>
  );
};

export default App;
