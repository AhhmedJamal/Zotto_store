import { useEffect, useState } from "react";
import Product from "../components/Product";
import Image from "../assets/EmptyFavorite.svg";
import GetData from "../hooks/getData";
import ShimmerDetails from "../components/Shimmer";

const Favorite = () => {
  const [loading, setLoading] = useState(false);
  const { products, getData } = GetData("favorites");

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0  pb-3 m-2">
        {products.length !== 0 ? (
          products.map((product) => {
            return (
              <Product key={product.uid} product={product} getData={getData} />
            );
          })
        ) : (
          <>
            {loading ? (
              <div className="flex flex-col justify-center items-center fixed h-[65vh] w-full bg-white m-4 rounded-lg">
                <img src={Image} alt="img" width={250} />
                <h2 className="font-bold text-[#37474F]">
                  No Favorite Items !!
                </h2>
              </div>
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
          </>
        )}
      </div>
    </>
  );
};
export default Favorite;
