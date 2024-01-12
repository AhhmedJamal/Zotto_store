import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";

const GetData = (name) => {
  const [products, setProducts] = useState([]);
  const CollectionsRef = collection(db, `${name}`);
  const getData = async () => {
    const data = await getDocs(CollectionsRef);
    setProducts(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return { products, getData };
};

export default GetData;
