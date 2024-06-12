/* eslint-disable react/prop-types */

import { MdAddShoppingCart } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import { GetDataUser } from "../store/user/user";
const ProductCard = ({ product }) => {
  const { uid, id, img, price, rating, description, category } = product;
  const router = useNavigate();
  const { name } = useParams();
  const [pathName, setPathName] = useState("");
  const [booleanIcon, setBooleanIcon] = useState(false);
  const [isAnimationFavorite, setIsAnimationFavorite] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleClick = () => {
    router(`/${category}/${uid}`);
  };

  const getBooleanIconFavorite = async () => {
    try {
      if (user.favorites) {
        user.favorites.map((item) => {
          item.id === id && setBooleanIcon(true);
        });
      }
    } catch (error) {
      console.error("Error fetching document:", error.message);
      // You can log the full error object for more details: console.error(error);
    }
  };
  const handleDeleteFavorite = async () => {
    setBooleanIcon(false);
    dispatch(GetDataUser(user.email));
    if (user.email) {
      try {
        const docRef = doc(db, "users", user.email);
        const updatedFavorites = user.favorites.filter(
          (item) => item.id !== id
        );
        await updateDoc(docRef, { favorites: updatedFavorites });
      } catch (error) {
        console.error("Error deleting favorite:", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  const addFavorite = async () => {
    setBooleanIcon(true);
    dispatch(GetDataUser(user.email));
    if (user.email) {
      try {
        const docRef = doc(db, "users", user.email);
        await updateDoc(docRef, {
          favorites: [...user.favorites, { ...product, favorite: true }],
        })
          .then(() => {
            console.log("updateDoc successfully");
          })
          .catch((error) => {
            console.error("Error updateDoc document:", error);
          });
      } catch (error) {
        console.error("Error getting or updateDoc document:", error);
      }
    }
  };

  const handleFavorite = () => {
    setIsAnimationFavorite(true);
    setTimeout(() => setIsAnimationFavorite(false), 600);
    booleanIcon ? handleDeleteFavorite() : addFavorite();
  };

  useEffect(() => {
    getBooleanIconFavorite();
    setPathName(name === undefined ? "mixProducts" : name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);
  return (
    <div className=" rounded-md overflow-hidden border shadow-md relative flex flex-col lg:hover:shadow-lg lg:hover:scale-95 justify-between transition duration-300 bg-white text-black">
      {location.pathname === "/favorites" ? (
        <button
          aria-label="button delete favorite "
          onClick={() => handleDeleteFavorite()}
          className=" m-2 w-fit bg-white p-[6px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none"
        >
          <AiTwotoneDelete
            className="transition-colors"
            size={20}
          />
        </button>
      ) : (
        <button
          aria-label="button add favorite "
          onClick={handleFavorite}
          className="m-2 w-fit bg-white p-[6px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none"
        >
          <div
            className={` ${isAnimationFavorite ? "animate-favorite-icon" : ""}`}
          >
            {booleanIcon ? (
              <MdOutlineFavorite size={20} className="text-primary" />
            ) : (
              <MdFavoriteBorder size={20} className="text-gray-700" />
            )}
          </div>
        </button>
      )}

      <img
        loading="lazy"
        src={img}
        onClick={location.pathname !== "/favorites" && handleClick}
        alt="card-image"
        className=" w-[100px] h-auto md:w-[150px] md:h-[205px]  m-auto"
      />
      <div className="flex justify-between">
        <div className="flex items-center px-[6px] p-[1px] rounded ml-3 ">
          <span className="text-[13px] font-bold mr-1 ">{rating}</span>
          <GoStarFill className="text-orange-400" />
        </div>
        <button
          aria-label="button add cart "
          onClick={() => {
            dispatch(addToCart({ product, id_user: user.id }));
          }}
          className="mx-3 w-fit bg-white p-[7px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none "
        >
          <MdAddShoppingCart size={20} className="text-gray-700" />
        </button>
      </div>
      <div className="p-4 pt-1">
        <p
          onClick={window.location.pathname !== "/favorite" && handleClick}
          className="mb-2 text-[11px] md:text-[15px] text-gray-600 overflow-hidden line-clamp-2"
        >
          {description}
        </p>
        <div className="flex items-center justify-between mt-2d">
          <div>
            <span className="font-normal text-[11px] md:text-[13px] text-gray-700">
              EPG
            </span>
            <span className="font-[700] text-[15px] md:text-[18px] text-blue-gray-900">
              {" "}
              {price?.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
