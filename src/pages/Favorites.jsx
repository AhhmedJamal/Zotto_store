import { useEffect, useState } from "react";
import FavoriteEmpty from "/assets/EmptyFavorite.svg";
import ShimmerDetails from "../components/Shimmer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getFromLocal } from "../store/cart/cartSlice";

function Favorites() {
  const [isLoading, setLisLoading] = useState(false);
  const { id, favorites } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(`shoppingCart_${id}`)) || [];
    dispatch(getFromLocal(items));
    setLisLoading(true);
    setTimeout(() => {
      setLisLoading(false);
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, favorites]);
  return (
    <div>
      {favorites.length !== 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0 pb-3 m-2 ">
          {favorites.map((favorite) => {
            return <ProductCard key={favorite.uid} product={favorite} />;
          })}
        </div>
      ) : (
        <div className=" container px-2 sm:px-0 pt-[8px] ">
          {isLoading ? (
            <div className="m-auto w-full absolute left-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ">
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
            </div>
          ) : (
            <div className="flex flex-col  items-center justify-center h-[70vh] w-full  rounded-lg bg-white">
              <img src={FavoriteEmpty} alt="cart" className="w-[230px]  " />
              <p className="font-bold text-[17px] text-[#37474f]">
                Favorite is empty !!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Favorites;
