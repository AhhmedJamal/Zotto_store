import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";

const Forget = () => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      alert("check your email !!");
    });
  };

  return (
    <div>
      <h1>?</h1>
      <input
        className="p-1 border-2 rounded-lg outline-none w-[130px]"
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleReset}
        type="button"
        className="bg-primary text-white rounded-md mt-4 p-1 font-[600] text-[14px] w-[200px] m-auto"
      >
        Reset Password
      </button>
    </div>
  );
};

export default Forget;
