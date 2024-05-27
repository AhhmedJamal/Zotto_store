import { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import ImageSearch from "/assets/Search.svg";
import useGetData from "../hooks/getData";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const refInput = useRef(null);
  const mixProducts = useGetData("mixProducts");
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
        ...mixProducts.products,
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

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="flex justify-evenly w-full">
        <div className="relative w-[70%]">
          <input
            ref={refInput}
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="border-2 border-[#e7e7e7] rounded-md p-2 w-full outline-none text-[14px] focus:border-primary"
          />
          {search !== "" && (
            <TiDelete
              size={25}
              className="absolute top-2 right-2 text-primary cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white font-bold px-3 py-1 rounded-md"
        >
          Search
        </button>
      </form>
      {loading ? (
        <div className="flex justify-center items-center flex-col h-[50vh]">
          <span className="w-11 h-11 border-4 border-primary border-r-transparent rounded-full  animate-spin"></span>
        </div>
      ) : result.length === 0 ? (
        <div className="flex justify-center items-center flex-col h-[60vh] bg-white m-3  rounded-lg">
          <img src={ImageSearch} alt="search" className="w-[250px]" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4 my-3">
          {result.map((product) => (
            <ProductCard product={product} key={product.uid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
