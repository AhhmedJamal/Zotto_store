import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoMdHelp } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
const Account = () => {
  const user = useSelector((state) => state.user);
  const router = useNavigate();

  const handleLogOut = () => {
    signOut(auth);
    router("/login");
  };

  return (
    <div className="px-4 flex flex-col justify-between gap-4">
      <div className="flex flex-col justify-center mt-[10px] bg-white p-5 rounded-md">
        <button
          onClick={handleLogOut}
          type="button"
          className="bg-primary text-white rounded-md p-1 pr-[2px] font-[600] text-[16px]  self-end shadow-[0_0px_9px_0px_rgba(0,0,0,0.3)]"
        >
          <IoExitOutline size={20} />
        </button>

        <div className="flex flex-col md:flex-row md:justify-center items-center relative gap-3 ">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Image-user"
              className="rounded-full w-[60px]"
            />
          ) : (
            <PiUserCircle size={80} />
          )}
          <div className="text-center md:text-start">
            <h1 className="font-bold  mb-1">{user.name}</h1>
            <h4 className="text-gray-700 text-[12px] ">{user.email}</h4>
          </div>
        </div>
      </div>
      <h4>REACH OUT TO US</h4>
      <div className="p-2 gap-1  flex flex-col">
        <button className="flex items-center gap-5  bg-white p-2">
          <PiPhoneCallFill size={20} /> Content us
        </button>

        <button className="flex items-center gap-5  bg-white p-2">
          <IoMdHelp size={20} />
          Help Center
        </button>
      </div>
      <div className="flex justify-center items-center gap-5 ">
        <FaFacebookF className="text-[25px] bg-primary text-white rounded-full p-1" />
        <FaInstagram className="text-[25px] bg-primary text-white rounded-full p-1" />
        <FaTwitter className="text-[25px] bg-primary text-white rounded-full p-1" />
      </div>
      <p className="text-[13px] text-center">
        © 2024 zotto. All Rights Reserved
      </p>
      <div className="w-full flex justify-between">
        <img
          src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/card-mastercard.svg"
          alt="image-mastercard"
          className="w-[50px]"
        />
        <img
          src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/card-visa.svg"
          alt="image-card-visa"
          className="w-[50px]"
        />
        <img
          src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/valu_v2.svg"
          alt="image-valu_v2"
          className="w-[50px]"
        />
        <img
          src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/card-amex.svg"
          alt="image-card-amex"
          className="w-[50px]"
        />
        <img
          src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/cod-en.svg"
          alt="image-cod-en"
          className="w-[50px]"
        />
      </div>
    </div>
  );
};

export default Account;
