import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel";
import { getFromLocal } from "../store/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Shimmer from "../components/Shimmer";
import ProductCard from "../components/ProductCard";
import useGetData from "../hooks/getData";

const CategoryPage = () => {
  const { name } = useParams();
  const { products, getData } = useGetData(name);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getData();
    const items =
      JSON.parse(localStorage.getItem(`shoppingCart_${user?.id}`)) || [];
    dispatch(getFromLocal(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, user]);

  return (
    <main>
      {location.pathname !== "/favorites" && <Carousel />}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0 pb-3 m-2">
        {products.length !== 0 ? (
          products.map((product) => {
            return <ProductCard key={product.uid} product={product} />;
          })
        ) : (
          <>
            <Shimmer title={"product"} />
            <Shimmer title={"product"} />
            <Shimmer title={"product"} />
            <Shimmer title={"product"} />
            <Shimmer title={"product"} />
            <Shimmer title={"product"} />
            <Shimmer title={"product"} />
            <Shimmer title={"product"} />
          </>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
