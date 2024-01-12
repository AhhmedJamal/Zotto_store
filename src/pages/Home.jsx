import { useEffect } from "react";
import MixProducts from "../components/MixProducts";
import { useDispatch } from "react-redux";
import { getFromLocal } from "../store/cart/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("shoppingCart")) || {};
    dispatch(getFromLocal(items));
  }, [dispatch]);
  return (
    <section>
      <MixProducts />
    </section>
  );
};

export default Home;
