import { useEffect } from "react";
import Shimmer from "../components/Shimmer";
import CarouselDefault from "../components/Carousel";
import OfferProducts from "../components/OfferProducts";
import Product from "../components/Product";
import GetData from "../hooks/getData";
import { getFromLocal } from "../store/cart/cartSlice";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";

const MixProducts = () => {
  const user = auth.currentUser;
  const { products, getData } = GetData("mixProducts");
  const dispatch = useDispatch();
  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem(`shoppingCart_${user?.uid}`)) || [];
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
            return (
              <Product key={product.uid} product={product} data={getData} />
            );
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
