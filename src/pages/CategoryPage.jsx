import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import CarouselDefault from "../components/Carousel";
import { getFromLocal } from "../store/cart/cartSlice";
import { useDispatch } from "react-redux";
import ShimmerDetails from "../components/Shimmer";
import { auth } from "../config/firebase";
import GetData from "../hooks/getData";

const CategoryPage = () => {
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const { name } = useParams();
  const { products, getData } = GetData(name);

  useEffect(() => {
    getData();
    const items =
      JSON.parse(localStorage.getItem(`shoppingCart_${user?.uid}`)) || [];
    dispatch(getFromLocal(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, user]);

  return (
    <main>
      {location.pathname !== "/favorites" && <CarouselDefault />}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0 pb-3 m-2">
        {products.length !== 0 ? (
          products.map((product) => {
            return (
              <Product key={product.uid} product={product} data={getData} />
            );
          })
        ) : (
          <>
            <ShimmerDetails is={false} />
            <ShimmerDetails is={false} />
            <ShimmerDetails is={false} />
            <ShimmerDetails is={false} />
            <ShimmerDetails is={false} />
            <ShimmerDetails is={false} />
            <ShimmerDetails is={false} />
            <ShimmerDetails is={false} />
          </>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
