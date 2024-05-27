import { useEffect, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import ImageSearch from "/assets/Search.svg";
import GetData from "../hooks/getData";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const refInput = useRef(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (search.trim() !== "") {
      const filteredData = data.filter((product) =>
        product.description.toLowerCase().includes(search.toLowerCase())
      );
      setResult(filteredData);
    } else {
      setResult([]);
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
    setLoading(false);
  };

  const mixProducts = GetData("mixProducts");
  const phones = GetData("phones");
  const home = GetData("home");
  const electrics = GetData("electroics");

  const fetchData = async () => {
    try {
      await mixProducts.getData();
      await phones.getData();
      await home.getData();
      await electrics.getData();

      setData([
        ...mixProducts.products,
        ...phones.products,
        ...home.products,
        ...electrics.products,
      ]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div>Loading...</div>
      ) : result.length === 0 ? (
        <div className="flex justify-center items-center flex-col h-[50vh] bg-white m-3 mt-9 rounded-lg">
          <img src={ImageSearch} alt="search" className="w-[250px]" />
        </div>
      ) : (
        <div>
          {result.map((product) => (
            <ProductCard product={product} key={product.uid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
