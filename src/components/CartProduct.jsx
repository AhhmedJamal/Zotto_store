import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/cart/cartSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CartProduct = ({ product }) => {
  const [count, setCount] = useState(0);
  // eslint-disable-next-line react/prop-types
  const { uid, img, title, price, priceDis, description } = product;
  const dispatch = useDispatch();

  return (
    <div className=" flex items-center gap-6 p-4  justify-around bg-white border w-full  ">
      <img src={img} alt="img-product" className=" w-[100px] sm:w-[150px]" />

      <div className="flex flex-col sm:flex-row ">
        <div className="flex flex-col justify-around  sd: w-full sm:w-[200px]  ">
          <h1 className="overflow-hidden line-clamp-2 text-gray-500 text-[13px] mb-2 sm:mt-0 mt-4">
            {title}
          </h1>
          <p className="leading-4 text-[14px] ">{description}</p>
          <b className="mt-2">
            ${price}{" "}
            {priceDis && (
              <del className="text-[12px] text-gray-500">${priceDis}</del>
            )}
          </b>
          <p className="flex items-center text-[12px] text-gray-600 mt-2 tracking-tighter">
            <img
              src="https://f.nooncdn.com/s/app/com/noon/icons/warranty.svg"
              alt="img-warranty"
              className=" w-[24px] mr-1"
            />
            Two-year warranty
          </p>
          <p className="flex items-center text-[12px] text-gray-600 my-1 tracking-tighter">
            <img
              src="https://f.nooncdn.com/s/app/com/noon/icons/non_returnable.svg"
              alt="img-warranty"
              className=" w-[24px] mr-1"
            />
            This product cannot be exchanged or returned
          </p>
        </div>
        <div className="flex flex-row justify-between mt-2 sm:ml-8 text-[12px] sm:text-[15px] sm:flex-col">
          <select
            id="numbers"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="border border-gray-300 w-fit p-1 sm:mb-4 text-gray-700 bg-[#F7F9FE]"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <button
            className="flex items-center text-[13px] font-bold text-gray-600 "
            onClick={() => dispatch(removeFromCart({ id: uid }))}
          >
            <RiDeleteBinLine className="text-[16px] text-gray-600 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
