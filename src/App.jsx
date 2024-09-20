import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { ToastContainer } from "react-toastify";
import Categories from "./components/Categories";
import BottomBar from "./components/BottomBar";
import { useDispatch } from "react-redux";
import { GetDataUser } from "./store/user/user";
import Footer from "./components/Footer";

const App = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBackButton = () => {
      history.pushState(null, null, document.URL);
    };
    window.addEventListener("popstate", handleBackButton);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const storedToken = localStorage.getItem(`token=${user?.uid}`);
      if (storedToken !== null) {
        try {
          dispatch(GetDataUser(user.email));
        } catch (error) {
          console.error("Error fetching document:", error);
        }
        console.log("User");
      } else {
        console.log("Gust");
      }
    });

    return () => {
      window.removeEventListener("popstate", handleBackButton);
      unsubscribe();
    };
  }, [dispatch, router]);

  return (
    <div className="container m-auto overflow-y-scroll h-[100vh] sm:h-screen pb-[70px] md:pb-0  md:px-8">
      <ToastContainer />
      <NavBar />
      <Categories />
      <Outlet />
      <Footer />
      <BottomBar />
    </div>
  );
};

export default App;
