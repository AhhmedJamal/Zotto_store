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
    <div className="px-4 flex flex-col gap-4 ">
      <div>
        <div className="relative flex flex-col justify-center my-[10px] bg-white p-2 rounded-md md:flex-row-reverse md:justify-around">
          <button
            onClick={handleLogOut}
            type="button"
            className="bg-primary absolute z-10 top-2 right-2 md:self-center text-white rounded-md p-1 pr-[2px]  self-end shadow-[0_0px_9px_0px_rgba(0,0,0,0.3)]"
          >
            <IoExitOutline size={22} />
          </button>

          <div className="flex flex-col md:flex-row md:justify- items-center relative gap-3 ">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Image-user"
                className="rounded-full w-[70px]"
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
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d377139.5122241768!2d32.20352275777219!3d30.51922198012801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1716663610163!5m2!1sar!2seg"
        height="100"
        className="w-full"
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div>
        <div className="flex justify-center items-center gap-5 ">
          <FaFacebookF className="text-[25px] bg-primary text-white rounded-full p-1" />
          <FaInstagram className="text-[25px] bg-primary text-white rounded-full p-1" />
          <FaTwitter className="text-[25px] bg-primary text-white rounded-full p-1" />
        </div>
        <p className="text-[13px] text-center my-4">
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
    </div>
  );
};

export default Account;
