import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import PaypalBtn from "./PaypalBtn";
import { useSelector } from "react-redux";

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const [phone, setPhone] = useState("");
  const [save, setSave] = useState(false);

  const [governorate, setGovernorate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("phoneNumber", phone);
    setSave((pre) => !pre);
  };
  useEffect(() => {
    setGovernorate(localStorage.getItem("Governorate") || "");
    setPhone(localStorage.getItem("phoneNumber") || "");
    phone !== "" ? setSave(true) : setSave(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="p-4 md:flex  gap-5  justify-center items-center h-[60vh] w-fit m-auto bg-white rounded-lg overflow-y-scroll">
        <div className="flex items-center   gap-3 text-blue-gray-400 border border-blue-gray-100 p-3 rounded-lg ">
          <CiLocationOn size={30} />
          <div>
            <p className=" text-[13px] font-bold">{user.displayName}</p>
            <p className=" text-[11px]">{governorate}</p>
            <label htmlFor="phone" className="text-[12px]">
              Enter a phone number :
            </label>
            <form
              className="flex justify-between items-center gap-3 "
              onSubmit={handleSubmit}
            >
              <input
                name="phone"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setSave(false);
                }}
                placeholder="Add phone Number"
                className=" text-[13px] border-2 rounded-lg outline-none px-2 py-1 "
                required
              />

              <button type="submit" className="">
                {save ? (
                  <FaCheckCircle size={20} className=" text-light-green-600" />
                ) : (
                  <IoAddCircleOutline
                    size={30}
                    className="text-blue-gray-400"
                  />
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="p-8  md:mt-6 w-full ">
          <PaypalBtn />
        </div>
      </div>
    </>
  );
};

export default Checkout;
