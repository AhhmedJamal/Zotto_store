/* eslint-disable react/prop-types */
import { Card, CardBody } from "@material-tailwind/react";
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
  const { uid, id, img, price, rating, description } = product;
  const router = useNavigate();
  const { name } = useParams();
  const [pathName, setPathName] = useState("");
  const [booleanIcon, setBooleanIcon] = useState(false);
  const dispatch = useDispatch();

  const { email, favorites } = useSelector((state) => state.user);

  const handleClick = () => {
    location.pathname === "/"
      ? router(`/mixProducts/${`${uid}`}`)
      : router(`${`${uid}`}`);
  };

  const getBooleanIconFavorite = async () => {
    try {
      if (favorites) {
        favorites.map((item) => {
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
    if (email) {
      try {
        const docRef = doc(db, "users", email);
        const updatedFavorites = favorites.filter((item) => item.id !== id);
        await updateDoc(docRef, { favorites: updatedFavorites });
      } catch (error) {
        console.error("Error deleting favorite:", error);
      }
    } else {
      console.log("User not logged in");
    }
    dispatch(GetDataUser(email));
  };

  const addFavorite = async () => {
    setBooleanIcon(true);
    dispatch(GetDataUser(email));
    if (email) {
      try {
        const docRef = doc(db, "users", email);
        await updateDoc(docRef, {
          favorites: [...favorites, { ...product, favorite: true }],
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
    booleanIcon ? handleDeleteFavorite() : addFavorite();
  };

  useEffect(() => {
    getBooleanIconFavorite();
    setPathName(name === undefined ? "mixProducts" : name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);
  return (
    <Card className=" rounded-none overflow-hidden  shadow-md relative flex justify-between transition duration-300 bg-white text-black  ">
      {location.pathname === "/favorites" ? (
        <button
          onClick={() => handleDeleteFavorite()}
          className=" m-2 w-fit bg-white p-[6px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none"
        >
          <AiTwotoneDelete size={20} />
        </button>
      ) : (
        <button
          onClick={handleFavorite}
          className=" m-2 w-fit bg-white p-[6px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none"
        >
          {booleanIcon ? (
            <MdOutlineFavorite size={20} className="text-primary" />
          ) : (
            <MdFavoriteBorder size={20} className="text-gray-700" />
          )}
        </button>
      )}

      <img
        onClick={location.pathname !== "/favorites" && handleClick}
        loading="lazy"
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
          onClick={window.location.pathname !== "/favorite" && handleClick}
          className="mb-2 text-[11px] text-gray-600 overflow-hidden line-clamp-2"
        >
          {description}
        </p>

        <div className="flex items-center justify-between mt-2d">
          <div>
            <span className="font-normal text-[11px] text-gray-700">EPG</span>
            <span className="font-[700] text-[15px] text-blue-gray-900">
              {" "}
              {price?.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default ProductCard;
