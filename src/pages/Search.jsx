import { useEffect, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import ImageSearch from "/assets/Search.svg";
import useGetData from "../hooks/getData";
import ProductCard from "../components/ProductCard";
import Shimmer from "../components/Shimmer";
import { Button } from "@material-tailwind/react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const refInput = useRef(null);
  const phones = useGetData("phones");
  const home = useGetData("home");
  const electrics = useGetData("electroics");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      setLoading(true);
      const allData = [
        ...phones.products,
        ...home.products,
        ...electrics.products,
      ];
      const filteredData = allData.filter((product) =>
        product.description.toLowerCase().includes(search.toLowerCase())
      );
      setTimeout(() => {
        setLoading(false);
        setResult(filteredData);
      }, 500);
    } else {
      if (refInput.current) {
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            if (refInput.current) {
              refInput.current.style.borderColor =
                i % 2 === 0 ? "#e61030" : "#e7e7e7";
            }
          }, i * 100);
        }
      }
    }
  };
  useEffect(() => {
    refInput.current.focus();
  }, []);
  return (
    <div className="p-2 ">
      <form onSubmit={handleSubmit} className="flex justify-between w-full">
        <div className="relative w-[70%]">
          <input
            ref={refInput}
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="What are you looking for ?"
            className=" border-2 border-[#e7e7e7] rounded-md p-2 w-full outline-none text-[14px] focus:border-primary"
          />
          {search !== "" && (
            <TiDelete
              size={25}
              className="absolute top-2 right-2 text-primary cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>
        <Button
          type="submit"
          className="bg-primary w-[28%] sm:w-[20%] text-white font-bold px-3 py-1 rounded-md"
        >
          Search
        </Button>
      </form>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
          <Shimmer is={false} />
          <Shimmer is={false} />
          <Shimmer is={false} />
          <Shimmer is={false} />
          <Shimmer is={false} />
          <Shimmer is={false} />
          <Shimmer is={false} />
          <Shimmer is={false} />
        </div>
      ) : result.length === 0 ? (
        <div className="flex justify-center items-center flex-col h-[60vh] mt-3 bg-white  rounded-lg">
          <img src={ImageSearch} alt="search" className="w-[250px]" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
          {result.map((product) => (
            <ProductCard product={product} key={product.uid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
