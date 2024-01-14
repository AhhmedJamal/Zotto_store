import {
  getAuth,
  onAuthStateChanged,
  updateEmail,

} from "firebase/auth";
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
    <div className="flex flex-col justify-center items-center mt-6 bg-white py-5 mx-4">
      <div className="flex flex-col justify-center items-center">
        <img
          src="https://cdn.dribbble.com/users/14659433/avatars/small/747cf25641f42bcb1cf230973c45b6b7.png?1702097839"
          alt="avatar"
        />
        <h1 className="font-bold">{email}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center ">
        <label htmlFor="email" className="text-gray-600 font-bold mt-4">
          Email:
        </label>
        <input
          className="p-2 border-2 rounded-lg outline-none"
          type="text"
          id="email"
          name="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="text-gray-600 font-bold mt-4">
          Password:
        </label>
        <input
          className="p-2 border-2 rounded-lg outline-none"
          type="password"
          id="password"
          name="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary text-white rounded-md mt-4 p-1 font-[600] text-[14px]"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Account;
