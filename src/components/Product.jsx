import { Card, CardBody } from "@material-tailwind/react";
import { FaRegEye } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
// eslint-disable-next-line react/prop-types
const Product = ({ product }) => {
  // eslint-disable-next-line react/prop-types
  const { uid, img, price, rating, description } = product;
  const [mark, setMark] = useState(false);
  const router = useNavigate();
  const dispatch = useDispatch();

  const handleFav = () => {
    setMark((pre) => !pre);
  };

  return (
    <Card
      className="
    rounded-none overflow-hidden hover:scale-95s shadow-md relative flex 
    justify-between transition duration-300 bg-white text-black group "
    >
      <div className="sm:scale-100 scale-75 absolute right-[-55px] top-[-17px] sm:top-0  sm:group-hover:right-[0px] group-hover:right-[-5px] transition-all z-10 bg-primary  rounded-tl rounded-bl  text-white p-3 flex flex-col">
        <button
          onClick={() => {
            dispatch(addToCart(product));
          }}
        >
          <FaCartPlus size={25} className="mb-5" />
        </button>
        <button
          onClick={() => {
            window.location.pathname === "/"
              ? router(`/mixProducts/${`${uid}`}`)
              : router(`${`${uid}`}`);
          }}
        >
          <FaRegEye size={25} className="mb-5" />
        </button>
        <button onClick={handleFav}>
          {mark ? (
            <MdOutlineFavorite size={25} />
          ) : (
            <MdFavoriteBorder size={25} />
          )}
        </button>
      </div>
      <img
        src={img}
        alt="card-image"
        className=" w-[120px] m-auto group-hover:scale-90 transition duration-300"
      />
      <div className="flex items-center  px-[6px] p-[1px] rounded ml-3 z-10">
        <span className="text-[13px] font-bold mr-1 ">{rating}</span>
        <GoStarFill className="text-orange-400" />
      </div>
      <CardBody className="p-4">
        <p className="mb-2 text-[11px] text-gray-600 overflow-hidden line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-2d">
          <div>
            <span className="font-normal text-[11px] text-gray-700">EPG</span>
            <span className="font-[700] text-[15px] text-blue-gray-900">
              {" "}
              {price}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Product;
