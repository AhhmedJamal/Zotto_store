import { useState, useEffect } from "react";
import {
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../assets/cart.png";
import { useSelector } from "react-redux";
import { FiMapPin } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiMenu5Fill } from "react-icons/ri";
import { TbBrandAmazon } from "react-icons/tb";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [email, setEmail] = useState("");
  const Governorate = localStorage.getItem("Governorate");
  const [selectedOption, setSelectedOption] = useState(
    Governorate !== null ? Governorate : ""
  );
  const router = useNavigate();
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

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      router("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
    onAuthStateChanged(auth, (user) => {
      setEmail(user.email);
    });
  }, []);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  return (
    <nav className=" fixed  z-10 pt-4 p-2 rounded-none border-none text bg-white w-full container sm:shadow-none shadow">
      <div className="relative mx-auto flex items-center justify-between text-dark-100 px-2  sm:p-0">
        <div
          onClick={toggleIsNavOpen}
          className="h-6 w-6 md:hidden text-dark-100 "
        >
          {isNavOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <RiMenu5Fill size={30} />
          )}
        </div>

        <Link
          to="/"
          className="relative flex text-[22px] items-center font-[800] "
        >
          <div>
            <TbBrandAmazon
              className="absolute top-[14px] left-5 text-primary"
              size={40}
            />
          </div>
          ZUTTO
        </Link>
        <div className="hidden md:flex items-center">
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
                className="w-[75px] text-[10px] bg-transparent"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </button>

          <input
            type="search"
            placeholder="Search"
            className="border px-4 h-[35px] text-[15px] rounded-md outline-none m-1"
          />
          <Menu open={isMenuOpen} handler={setIsMenuOpen}>
            <MenuHandler>
              <button
                color="blue-gray"
                className="text-[11px] tracking-widest sm:text-[11px] text-start  p-2 "
              >
                Hello,
                {email ? <span className="font-bold">{email}</span> : "sign in"}
                <br />
                <div className="flex items-center gap-2">
                  Account & List
                  <IoMdArrowDropdown size={20} />
                </div>
              </button>
            </MenuHandler>
            <MenuList className="p-2">
              <MenuItem className="pl-0 focus:bg-transparent text-black">
                <Link to="/account">Account</Link>
              </MenuItem>
              <hr />
              <MenuItem className="pl-0 focus:bg-transparent text-black">
                <Link to="settings">Settings</Link>
              </MenuItem>
              <hr />
              <MenuItem className="pl-0 focus:bg-transparent text-black">
                <div onClick={logout}>Log out</div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <Link
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
            <img src={Cart} alt="cart" className="w-6 " />
          </div>
        </Link>
      </div>
      <Collapse
        open={isNavOpen}
        className="overflow-scroll rounded mt-3 bg-gray-100 "
      >
        <div className="flex flex-col  md:hidden ">
          <Menu open={isMenuOpen2} handler={setIsMenuOpen2}>
            <MenuHandler>
              <button
                color="blue-gray"
                className="text-[12px] sm:text-[11px] text-start p-2"
              >
                Hello,
                {email ? (
                  <span className="font-bold text-[13px]">{email}</span>
                ) : (
                  "sign in"
                )}
                <br />
                <div className="flex items-center gap-2">
                  Account & List
                  <IoMdArrowDropdown size={17} />
                </div>
              </button>
            </MenuHandler>
            <MenuList className="absolute top-[-100px]">
              <MenuItem className="pl-0 focus:bg-transparent text-black">
                <Link to="/account">Account</Link>
              </MenuItem>
              <hr />
              <MenuItem className="pl-0 focus:bg-transparent text-black">
                <Link to="settings">Settings</Link>
              </MenuItem>
              <hr />
              <MenuItem className="pl-0 focus:bg-transparent text-black">
                <div onClick={logout}>Log out</div>
              </MenuItem>
            </MenuList>
          </Menu>
          <span className="bg-gray-200 h-[1px] w-full" />
          <button className="p-2 text-[11px] text-start">
            <span className="ml-[2px]"> Deliver to</span>
            <br />
            <div className="flex items-center font-bold">
              <FiMapPin />
              <select
                name="location"
                id="location"
                value={selectedOption}
                onChange={(e) => handleOptionChange(e.target.value)}
                className="w-[75px] text-[10px] bg-transparent"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </button>
          <span className="bg-gray-200 h-[1px] w-full" />
          <input
            type="search"
            placeholder="Search"
            className=" px-4 h-[35px] text-[15px] rounded-md outline-none m-1"
          />
        </div>
      </Collapse>
    </nav>
  );
};

export default NavBar;
