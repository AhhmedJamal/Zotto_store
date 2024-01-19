import { Card, CardBody } from "@material-tailwind/react";
import { MdAddShoppingCart } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import GetData from "../hooks/getData";

// eslint-disable-next-line react/prop-types
const Product = ({ product, data }) => {
  // eslint-disable-next-line react/prop-types
  const { uid, id, pathName, img, price, rating, description, favorite } =
    product;
  const { products, getData } = GetData("favorites");
  const router = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  // const [pathName, setPathName] = useState("");
  const handleClick = () => {
    location.pathname === "/"
      ? router(`/mixProducts/${`${uid}`}`)
      : router(`${`${uid}`}`);
  };

  const handleDeleteFavorite = () => {
    products.filter(async (item) => {
      if (item.uid == uid) {
        if (!item.favorite) {
          await deleteDoc(doc(db, "favorites", item.id));
        }
        const documentRef = doc(db, "phones", id);
        await updateDoc(documentRef, { favorite: !favorite });
      }
      data();
    });
  };
  const handleFavorite = async () => {
    const documentRef = doc(db, "phones", id);
    const CollectionsRef = collection(db, `favorites`);
    !favorite
      ? await addDoc(CollectionsRef, { ...product, pathName: name })
      : handleDeleteFavorite();
    await updateDoc(documentRef, { favorite: !favorite });
    data();
  };

  useEffect(() => {
    getData();
    if (name === "") {
      // setPathName("");
    } else {
      // setPathName(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <Card className=" rounded-none overflow-hidden  shadow-md relative flex justify-between transition duration-300 bg-white text-black  ">
      {location.pathname === "/favorite" ? (
        <button
          onClick={handleDeleteFavorite}
          className=" m-2 w-fit bg-white p-[6px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none"
        >
          <AiTwotoneDelete size={20} />
        </button>
      ) : (
        <button
          onClick={handleFavorite}
          className=" m-2 w-fit bg-white p-[6px] shadow-[0_0px_15px_-1px_rgb(0,0,0,0.3)] rounded-full outline-none"
        >
          {favorite ? (
            <MdOutlineFavorite size={20} className="text-primary" />
          ) : (
            <MdFavoriteBorder size={20} className="text-gray-700" />
          )}
        </button>
      )}

      <img
        onClick={
          window.location.pathname !== "/favorite" ? handleClick : () => {}
        }
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
              {price.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Product;
