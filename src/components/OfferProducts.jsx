import OfferCard from "./OfferCard";
import { useEffect } from "react";
import GetData from "../hooks/getData";

const OfferProducts = () => {
  const { products, getData } = GetData("offer");

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="bg-blue-gray-900 text-white p-3 mt-3 mx-2 sm:mx-0">
      <h2 className="font-bold text-[18px] mb-3 ">Weekend mega deals</h2>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 place-items-center">
        {products.map((offer) => {
          return <OfferCard key={offer.uid} offer={offer} />;
        })}
      </div>
    </section>
  );
};

export default OfferProducts;
