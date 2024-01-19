import { useEffect, useState } from "react";
import Product from "../components/Product";
import Image from "../assets/EmptyFavorite.svg";
import GetData from "../hooks/getData";
import ShimmerDetails from "../components/Shimmer";
import { useDispatch } from "react-redux";
import { getFromLocal } from "../store/cart/cartSlice";

const Favorite = () => {
  const [loading, setLoading] = useState(false);
  const { products, getData } = GetData("favorites");
  const dispatch = useDispatch();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("shoppingCart")) || {};
    dispatch(getFromLocal(items));
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        {products.length !== 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0  pb-3 m-2">
            {products.map((product) => {
              return (
                <Product key={product.uid} product={product} data={getData} />
              );
            })}
          </div>
        ) : (
          <>
            {loading ? (
              <div className="flex flex-col justify-center items-center h-[65vh] bg-white m-4 rounded-lg">
                <img src={Image} alt="img" width={250} />
                <h2 className="font-bold text-[#37474F]">
                  No Favorite Items !!
                </h2>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0  pb-3 m-2">
                <ShimmerDetails is={false} />
                <ShimmerDetails is={false} />
                <ShimmerDetails is={false} />
                <ShimmerDetails is={false} />
                <ShimmerDetails is={false} />
                <ShimmerDetails is={false} />
                <ShimmerDetails is={false} />
                <ShimmerDetails is={false} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Favorite;
