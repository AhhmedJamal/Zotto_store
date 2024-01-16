import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const Account = () => {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [pass, setPass] = useState("");
  const auth = getAuth();

  const changeEmail = async () => {
    await updateEmail(auth.currentUser, newEmail)
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeEmail();
  };

  const handleRest = () => {
    sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail("");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col justify-center  mt-[100px] bg-white p-5 mx-4">
      <div className="flex flex-col justify-center items-center">
        <FaRegUserCircle size={60} />
      </div>

      <label htmlFor="email" className="text-gray-600 font-bold mt-4 ">
        Email:
      </label>
      <input
        disabled
        className="p-2 border-2 rounded-lg outline-none"
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setNewEmail(e.target.value)}
        required
      />

      <button
        onClick={handleRest}
        type="button"
        className="bg-primary text-white rounded-md mt-4 p-1 font-[600] text-[14px] w-[200px] m-auto"
      >
        Rest Password
      </button>
    </div>
  );
};

export default Account;
