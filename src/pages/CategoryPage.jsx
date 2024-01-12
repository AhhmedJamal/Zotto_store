import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Shimmer from "../components/Shimmer";
import CarouselDefault from "../components/Carousel";
import { getFromLocal } from "../store/cart/cartSlice";
import { useDispatch } from "react-redux";
import GetData from "../hooks/getData";
import OfferProducts from "../components/OfferProducts";
const CategoryPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  const { products, getData } = GetData(name);

  useEffect(() => {
    getData();
    const items = JSON.parse(localStorage.getItem("shoppingCart")) || {};
    dispatch(getFromLocal(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, dispatch]);

  return (
    <>
      <CarouselDefault />
      {name === "mixProducts" && <OfferProducts />}
      <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0  pb-3 m-2">
        {products.length !== 0 ? (
          products.map((product) => {
            return <Product key={product.id} product={product} />;
          })
        ) : (
          <>
            <Shimmer is={false} />
            <Shimmer is={false} />
            <Shimmer is={false} />
            <Shimmer is={false} />
            <Shimmer is={false} />
            <Shimmer is={false} />
            <Shimmer is={false} />
            <Shimmer is={false} />
          </>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
