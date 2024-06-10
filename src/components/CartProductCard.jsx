/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteProductCart,
} from "../store/cart/cartSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useEffect, useState } from "react";

const CartProductCard = ({ product, countProduct }) => {
  const { uid, img, title, price, priceDis, description } = product;
  const [count, setCount] = useState(countProduct);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  useEffect(() => {
    setCount(countProduct);
  }, [countProduct]);
  const handleIncrement = () => {
    setCount(count + 1);
    dispatch(addToCart({ product, id_user: id }));
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      dispatch(removeFromCart({ uid, id_user: id }));
    }
  };
  return (
    <div className=" flex items-center gap-2 p-4  justify-around bg-white border w-full rounded-lg">
      <img
        src={img}
        alt="img-product"
        className=" w-[110px] sm:w-[150px]"
        loading="lazy"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col justify-around sd: w-full sm:w-[220px]">
          <h1 className="overflow-hidden line-clamp-2 text-gray-500 text-[13px] mb-2 sm:mt-0 mt-4">
            {title}
          </h1>
          <p className="leading-4 text-[14px] ">{description}</p>
          <b className="mt-2">
            <span className="font-normal text-[11px] text-gray-700">EPG</span>{" "}
            {price?.toLocaleString("en-US")}{" "}
            {priceDis && (
              <del className="text-[12px] text-gray-500">
                ${priceDis?.toLocaleString("en-US")}
              </del>
            )}
          </b>
          <p className="flex items-center text-[12px] text-gray-600 mt-2 tracking-tighter">
            <img
              loading="lazy"
              src="https://f.nooncdn.com/s/app/com/noon/icons/warranty.svg"
              alt="img-warranty"
              className=" w-[24px] h-auto  mr-1"
            />
            Two-year warranty
          </p>
          <p className="flex items-center text-[12px] text-gray-600 mt-2 tracking-tighter">
            <img
              src="https://f.nooncdn.com/s/app/com/noon/icons/non_returnable.svg"
              alt="img-warranty"
              className=" w-[24px] mr-1 "
              loading="lazy"
            />
            This product cannot be exchanged or returned
          </p>
        </div>
        <div className="flex justify-between mt-2 text-[12px] sm:text-[15px] sm:flex-col">
          <div id="numbers" value={count}>
            <button
              className="text-blue-gray-800 m-1 rounded-full "
              onClick={handleDecrement}
            >
              <FaMinus size={13} />
            </button>

            <span className="border border-gray-300 w-fit p-2 mx-2 text-[15px] text-gray-800 bg-[#F7F9FE] rounded-md">
              {count}
            </span>
            <button
              className="text-blue-gray-800 m-1 rounded-full "
              onClick={handleIncrement}
            >
              <FaPlus size={14} />
            </button>
          </div>
          <button
            className="flex items-center self-end text-[11px] font-bold text-gray-600 "
            onClick={() =>
              dispatch(deleteProductCart({ id: uid, id_user: id }))
            }
          >
            <RiDeleteBinLine className="text-[13px] text-gray-600 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
