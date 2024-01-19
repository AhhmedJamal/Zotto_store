import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import Image from "../assets/forgotPassword.svg";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

const Forget = () => {
  const [email, setEmail] = useState("");
  const router = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email).then(() => {
      toast.success("Check Your Email 😇", {
        position: toast.POSITION.TOP_CENTER,
        className: "text-[15px]",
        autoClose: 2500,
      });
    });
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <div></div>
      <IoMdArrowBack
        size={35}
        className="md:hidden m-5 p-[2px] self-start bg-gray-200 rounded-lg text-gray-800"
        onClick={() => {
          router(-1);
        }}
      />
      <form
        onSubmit={handleReset}
        className="flex flex-col justify-center items-center p-4 h-[70vh]"
      >
        <img src={Image} alt="image-Password" width={300} />
        <input
          className="p-1 border-2 rounded-lg outline-none w-[250px]"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter Email"
        />
        <button
          type="submit"
          className="bg-primary text-white rounded-md mt-4 p-1 font-[600] text-[14px] w-[200px]"
        >
          Reset Password
        </button>
      </form>
    </>
  );
};

export default Forget;
