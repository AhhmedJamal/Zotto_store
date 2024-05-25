import { useEffect } from "react";
import Shimmer from "../components/Shimmer";
import CarouselDefault from "../components/Carousel";
import OfferProducts from "../components/OfferProducts";
import GetData from "../hooks/getData";
import { getFromLocal } from "../store/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const MixProducts = () => {
  const { products, getData } = GetData("mixProducts");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    console.log(import.meta.env.VITE_FIREBASE_API_KEY);
    console.log(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
    console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);
    console.log(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
    console.log(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
    console.log(import.meta.env.VITE_FIREBASE_APP_ID);
    const items =
      JSON.parse(localStorage.getItem(`shoppingCart_${user?.id}`)) || [];
    dispatch(getFromLocal(items));
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <section>
      <CarouselDefault />
      {products.length !== 0 && <OfferProducts />}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0  pb-3 m-2">
        {products.length !== 0 ? (
          // eslint-disable-next-line no-unused-vars
          products.map((product) => {
            return <ProductCard key={product.uid} product={product} />;
          })
        ) : (
          <>
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </>
        )}
      </div>
    </section>
  );
};

export default MixProducts;
