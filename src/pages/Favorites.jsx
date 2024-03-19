import { useEffect, useState } from "react";
import Product from "../components/Product";
import FavoriteEmpty from "../assets/EmptyFavorite.svg";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [idDoc, setIdDoc] = useState("");
  const collectionsRef = collection(db, "users");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFavorites = async () => {
    getDocs(collectionsRef).then((querySnapshot) => {
      const documentIds = querySnapshot.docs.map((doc) => doc.id);
      setIdDoc(...documentIds);
    });
    try {
      const docRef = doc(db, "users", idDoc); // Replace 'idDoc' with the actual document ID
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        // Assuming userData.favorite is an array
        setFavorites(userData.favorite);
        console.log("Favorites set:", userData.favorite);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error fetching document:", error.message);
      // You can log the full error object for more details: console.error(error);
    }
  };
  useEffect(() => {
    getFavorites();
    console.log("gf");
  }, []);
  return (
    <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0 pb-3 m-2">
      {favorites.length !== 0 ? (
        favorites.map((favorite) => {
          return (
            <Product key={favorite.uid} product={favorite} data={() => {}} />
          );
        })
      ) : (
        <div className="m-auto w-[55%]">
          <div className=" absolute  flex flex-col  items-center justify-center h-[60vh] w-[80%]  rounded-lg">
            <img src={FavoriteEmpty} alt="cart" className="w-[250px]  " />
            <p className="font-bold text-[17px] text-[#37474f]">
              Favorite is empty !!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
