import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Cart from "/assets/cart.png";
import { useSelector } from "react-redux";
import { FiMapPin } from "react-icons/fi";
import { CgSearch } from "react-icons/cg";
import { BsPerson } from "react-icons/bs";
import { MdOutlineDoneOutline } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { TbBrandAmazon } from "react-icons/tb";
import { BsBox2 } from "react-icons/bs";
const NavBar = () => {
  const Governorate = localStorage.getItem("Governorate");
  const [selectedOption, setSelectedOption] = useState(
    Governorate !== null ? Governorate : ""
  );

  const cartItems = useSelector((state) => state.cart.items);
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
    <nav className=" fixed  z-10 pt-4 p-2 rounded-none border-none text bg-white w-full container  shadow">
      <div className="relative mx-auto flex  items-center justify-between text-dark-100 px-2  sm:p-0">
        <Link
          to="/"
          className="relative mb-1 flex text-[22px] items-center font-[800] text-black"
        >
          <div>
            <TbBrandAmazon
              className="absolute top-[12px] left-5 text-primary"
              size={40}
            />
          </div>
          ZOTTO
        </Link>{" "}
        <div className="flex items-center gap-4">
          <button className="p-2 text-[11px]  text-start">
            <span className="ml-[2px]"> Deliver to</span>
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
        <div className="hidden md:flex items-center">
          <NavLink
            to="orders"
            className="text-[9px] font-bold flex flex-col justify-center items-center m-2 mt-[10px] relative"
          >
            <BsBox2 className="mb-[2px]" size={21} />
            <MdOutlineDoneOutline
              className="mb-[2px] absolute top-[7px]"
              size={12}
            />
            Orders
          </NavLink>
          <NavLink
            color="blue-gray"
            className="flex items-center flex-col text-[9px] font-bold  text-start  p-2 "
            to={"/favorites"}
          >
            <IoMdHeartEmpty size={25} />
            Favorites
          </NavLink>
          <NavLink
            color="blue-gray"
            className="flex items-center  flex-col text-[9px] font-bold  text-start  p-2 "
            to={"/account"}
          >
            <BsPerson size={25} />
            Account
          </NavLink>
        </div>
        <div className="flex items-center gap-7">
          <NavLink to="/search" className="h-6 w-6 md:hidde text-dark-100 ">
            <CgSearch size={25} className="" />
          </NavLink>
          <NavLink
            to="/cart"
            type="button"
            className="relative rounded-full  text-gray-400  focus:outline-none pr-2 "
          >
            <div className="relative">
              <span
                className={`text-[12px] font-bold transition-all ${
                  cartItems.length == 0 ? "scale-0" : "scale-100"
                }  absolute top-[-10px] left-3 flex justify-center items-center bg-primary text-white px-1 rounded-full`}
              >
                {cartItems.length !== 0 && cartItems.length}
              </span>
              <img src={Cart} alt="cart" className="w-6" />
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
