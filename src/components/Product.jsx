/* eslint-disable react/prop-types */
import { Card, CardBody } from "@material-tailwind/react";
import { MdAddShoppingCart } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Product = ({ product, data }) => {
  const { uid, id, img, price, rating, description, favorite } = product;
  const [idDoc, setIdDoc] = useState("");
  const router = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();

  const collectionsRef = collection(db, "users");
  const handleClick = () => {
    location.pathname === "/"
      ? router(`/mixProducts/${`${uid}`}`)
      : router(`${`${uid}`}`);
  };

  const handleDeleteFavorite = async () => {
    const oldFavorites = localStorage.getItem("Favorites");
    if (!oldFavorites) return; // If no favorites exist, there's nothing to remove

    const favorites = JSON.parse(oldFavorites);

    // Filter out the item with the specified ID
    const filteredFavorites = favorites.filter((fav) => fav.id !== id);

    // Update localStorage with the filtered favorites
    localStorage.setItem("Favorites", JSON.stringify(filteredFavorites));

    data();
  };


  const addFavorite = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const dataFromCollection = await getDocs(collectionsRef);
          const data = dataFromCollection.docs.map((doc) => doc.data());
          const filteredData = data.find((item) => item.id === user.uid);
          const docRef = doc(db, "users", idDoc);
          const newFavorites = {
            favorite: [...filteredData.favorite, product],
          };
          updateDoc(docRef, newFavorites)
            .then(() => {
              console.log("Document updated successfully");
            })
            .catch((error) => {
              console.error("Error updating document:", error);
            });
        } catch (error) {
          console.error("Error getting or updating document:", error);
        }
      }
    });
  };

  const updateFavorite = () => {
    const documentRef = doc(db, name, id);
    updateDoc(documentRef, { favorite: false });
  };
  const handleFavorite = async () => {
    !favorite ? addFavorite() : updateFavorite();
    data();
  };
  // const handleFavorite = async () => {
  //   const documentRef = doc(db, name, id);
  //   const CollectionsRef = collection(db, "favorites");
  //   !favorite
  //     : // await addDoc(CollectionsRef, product)
  //    await updateDoc(documentRef, { favorite: !favorite });
  //   data();
  // };

  useEffect(() => {
    getDocs(collectionsRef).then((querySnapshot) => {
      const documentIds = querySnapshot.docs.map((doc) => doc.id);
      setIdDoc(...documentIds);
    });

    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className=" rounded-none overflow-hidden  shadow-md relative flex justify-between transition duration-300 bg-white text-black  ">
      {location.pathname === "/favorites" ? (
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
        onClick={location.pathname !== "/favorites" ? handleClick : () => {}}
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
//  <div className="flex flex-col justify-center items-center h-[65vh] bg-white m-4 rounded-lg">
//    <img src={Image} alt="img" width={250} />
//    <h2 className="font-bold text-[#37474F]">No Favorite Items !!</h2>
//  </div>;
