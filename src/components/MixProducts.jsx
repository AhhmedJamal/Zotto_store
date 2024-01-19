import { useEffect } from "react";
import Shimmer from "./Shimmer";
import CarouselDefault from "./Carousel";
import OfferProducts from "./OfferProducts";
import GetData from "../hooks/getData";
import Product from "./Product";

const MixProducts = () => {
  const { products, getData } = GetData("mixProducts");
  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
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
    </>
  );
};

export default MixProducts;
