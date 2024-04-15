import { useEffect, useState } from "react";
import Product from "../components/Product";
import FavoriteEmpty from "../assets/EmptyFavorite.svg";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import ShimmerDetails from "../components/Shimmer";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setLisLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFavorites = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.email);
        const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data();
        setFavorites(userData.favorite);
      
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
    setLisLoading(true);
    setTimeout(() => {
      setLisLoading(false);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0 pb-3 m-2">
      {favorites.length !== 0 ? (
        favorites.map((favorite) => {
          return (
            <Product
              key={favorite.uid}
              product={favorite}
              data={() => getFavorites()}
            />
          );
        })
      ) : (
        <div className=" container m-auto w-[96%] absolute grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:mx-0 pb-3  ">
          {isLoading ? (
            <>
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
              <ShimmerDetails />
            </>
          ) : (
            <div className=" absolute  flex flex-col  items-center justify-center h-[70vh] w-full  rounded-lg bg-white">
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
