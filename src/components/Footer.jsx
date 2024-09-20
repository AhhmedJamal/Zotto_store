import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div className="bg-white border mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 place-content-center gap-4  py-4 shadow-[0_0px_1px_-1px_rgb(0,0,0,0.1)]">
        <div className="grid grid-cols-2  justify-center place-items-center items-start ">
          <div>
            <p className="font-bold ">About Us</p>
            <ul className="text-[14px] hover:cursor-pointer">
              <li>Pricing</li>
              <li>Services</li>
              <li>About Product</li>
            </ul>
          </div>
          <div>
            <p className="font-bold ">Media</p>
            <ul className="text-[14px] hover:cursor-pointer">
              <li>Privacy Police</li>
              <li>Development</li>
              <li>Teams & Services</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-co justify-evenly items-center">
          <div>
            <p className="font-bold mb-2">Subscribe</p>
            <div className="flex items-center h-[30px]">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-100 border text-white font-bold text-[13px] placeholder:text-gray-500  pl-2 rounded-l-md w-full h-full"
              />
              <button className="bg-primary text-white text-[13px] font-bold py-1 px-2 rounded-r-md h-full">
                Submit
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <FaPhone />
              <address>Zotto@gmail.com</address>
            </div>
            <div className="flex items-center gap-3">
              <IoMdMail /> <p>1 (888) 602-6745</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <FaFacebook size={22} />
            <FaTwitter size={22} />
            <RiInstagramFill size={22} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between p-6">
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

export default Footer;
