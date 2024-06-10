import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoName from "/assets/ZottoLogo.png";
import { useSelector } from "react-redux";
import { FiMapPin } from "react-icons/fi";
import { CgSearch } from "react-icons/cg";
import { BsPerson } from "react-icons/bs";
import { MdOutlineDoneOutline } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBox2 } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
const NavBar = () => {
  const Governorate = localStorage.getItem("Governorate");
  const [selectedOption, setSelectedOption] = useState(
    Governorate !== null ? Governorate : ""
  );
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const options = [
    { value: "Cairo", text: "Cairo" },
    { value: "Giza", text: "Giza" },
    { value: "Ismailia", text: "Ismailia" },
    { value: "Suez", text: "Suez" },
    { value: "Alexander", text: "Alexander" },
    { value: "Luxor", text: "Luxor" },
  ];

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    localStorage.setItem("Governorate", value);
  };

  return (
    <header className=" fixed  z-20  pt-2 rounded-none border-none text bg-white w-full container  shadow">
      <nav className="relative mx-auto flex  items-center justify-between text-dark-100 px-3  sm:pl-0 ">
        <Link to="/" className="relative  flex">
          <img src={LogoName} alt="Logo" className="w-28 h-auto sm:w-32" />
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-2 text-[12px] font-bold tracking-wider  text-start">
            <label htmlFor="location">
              <span className="ml-[2px]"> Deliver to</span>
            </label>
            <br />
            <div className="flex items-center font-bold">
              <FiMapPin />
              <select
                name="location"
                id="location"
                value={selectedOption}
                onChange={(e) => handleOptionChange(e.target.value)}
                className="w-[70px] text-[10px] bg-transparent"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </button>
        </div>
        <div className="hidden md:flex items-center text-[9px]  md:text-[12px]">
          <NavLink
            to="orders"
            className=" flex flex-col justify-center items-center m-2 mt-[10px] relative"
          >
            <BsBox2 className="mb-[2px]" size={21} />
            <MdOutlineDoneOutline
              className="mb-[2px] absolute top-[7px]"
              size={12}
            />
            Orders
          </NavLink>
          <NavLink
            className="flex items-center flex-col p-2 relative group"
            to={"/favorites"}
          >
            <IoMdHeartEmpty size={25} />
            <div
              className={`${
                user.favorites?.length == 0 ? "scale-0 " : "scale-100"
              } transition-all z-10 absolute top-2 right-4 `}
            >
              <span
                className={`transition-all ${
                  user.favorites?.length !== 0
                    ? "group-hover:scale-0"
                    : "group-hover:scale-100"
                } w-2 h-2 flex items-center pt-[2px] justify-center rounded-full bg-primary text-white `}
              ></span>
            </div>
            Favorites
          </NavLink>
          <NavLink className="flex items-center flex-col p-2" to={"/account"}>
            <BsPerson size={25} />
            Account
          </NavLink>
        </div>
        <div className="flex items-center gap-7 md:gap-16 text-[10px]  md:text-[12px]">
          <NavLink
            to="/search"
            className="text-dark-100 flex flex-col items-center"
            aria-label="link search"
          >
            <CgSearch size={25} className="mr-1" />
            Search
          </NavLink>
          <NavLink
            to="/cart"
            type="button"
            className="relative flex flex-col items-center"
            aria-label="link cart"
          >
            <span
              className={`text-[11px] md:text-[12px] font-bold transition-all ${
                cart.items.length == 0 ? "scale-0" : "scale-100"
              }  absolute top-[-12px] md:top-[-15px] left-3 flex justify-center items-center bg-primary text-white px-1 rounded-full`}
            >
              {cart.items.length !== 0 && cart.items.length}
            </span>
            <RiShoppingCartLine size={26} />
            Cart
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
