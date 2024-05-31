import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";

const useGetData = (name) => {
  const [products, setProducts] = useState([]);
  const CollectionsRef = collection(db, name);

  const getData = async () => {
    const data = await getDocs(CollectionsRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, getData };
};

export default useGetData;
