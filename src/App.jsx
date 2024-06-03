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
    const x = import.meta.env.VITE_NAME;
    console.log(x);
    const handleBackButton = () => {
      history.pushState(null, null, document.URL);
    };
    window.addEventListener("popstate", handleBackButton);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const storedToken = localStorage.getItem(`token=${user.uid}`);
        if (storedToken === user.uid) {
          try {
            dispatch(GetDataUser(user.email));
          } catch (error) {
            console.error("Error fetching document:", error);
          }
        } else {
          toast.error("Authorization Failed !!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setTimeout(() => router("/login"), 5000);
        }
      } else {
        router("/login");
      }
    });

    return () => {
      window.removeEventListener("popstate", handleBackButton);
      unsubscribe();
    };
  }, [dispatch, router]);

  return (
    <div className="container m-auto overflow-y-scroll h-[100vh] sm:h-screen pb-20 sm:pb-0">
      <ToastContainer />
      <NavBar />
      <Categories />
      <Outlet />
      <BottomBar />
    </div>
  );
};

export default App;
