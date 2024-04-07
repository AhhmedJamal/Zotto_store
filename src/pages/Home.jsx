import { useEffect } from "react";
import MixProducts from "../components/MixProducts";
import { useDispatch } from "react-redux";
import { getFromLocal } from "../store/cart/cartSlice";
import { auth } from "../config/firebase";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = auth.currentUser;
    const items =
      JSON.parse(localStorage.getItem(`shoppingCart_${user?.uid}`)) || [];
    dispatch(getFromLocal(items));
  }, [dispatch]);
  return (
    <section>
      <MixProducts />
    </section>
  );
};

export default Home;
