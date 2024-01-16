import { Card, CardBody } from "@material-tailwind/react";
import { MdAddShoppingCart } from "react-icons/md";
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
  const handleClick = () => {
    window.location.pathname === "/"
      ? router(`/mixProducts/${`${uid}`}`)
      : router(`${`${uid}`}`);
  };

  return (
    <Card className="rounded-none overflow-hidden  shadow-md relative flex justify-between transition duration-300 bg-white text-black  ">
      <button
        onClick={handleFav}
        className=" m-2 w-fit bg-white p-[6px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none"
      >
        {mark ? (
          <MdOutlineFavorite size={20} className="text-primary" />
        ) : (
          <MdFavoriteBorder size={20} className="text-gray-600" />
        )}
      </button>
      <img
        onClick={handleClick}
        src={img}
        alt="card-image"
        className=" w-[120px] m-auto"
      />
      <div className="flex justify-between">
        <div className="flex items-center px-[6px] p-[1px] rounded ml-3 ">
          <span className="text-[13px] font-bold mr-1 ">{rating}</span>
          <GoStarFill className="text-orange-400" />
        </div>
        <button
          onClick={() => {
            dispatch(addToCart(product));
          }}
          className=" m-3 w-fit bg-white p-[7px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none"
        >
          <MdAddShoppingCart size={20} className="text-gray-700" />
        </button>
      </div>
      <CardBody className="p-4">
        <p
          onClick={handleClick}
          className="mb-2 text-[11px] text-gray-600 overflow-hidden line-clamp-2"
        >
          {description}
        </p>

        <div className="flex items-center justify-between mt-2d">
          <div>
            <span className="font-normal text-[11px] text-gray-700">EPG</span>
            <span className="font-[700] text-[15px] text-blue-gray-900">
              {" "}
              {price.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Product;
