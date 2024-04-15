import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { PiUserCircle } from "react-icons/pi";
import { doc, getDoc } from "firebase/firestore";
const Account = () => {
  const [user, setUser] = useState([]);
  const router = useNavigate();

  const handleLogOut = () => {
    signOut(auth);
    router("/login");
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const docRef = doc(db, "users", user.email);
      const docSnapshot = await getDoc(docRef);
      const userData = docSnapshot.data();
      if (user) {
        setUser(userData);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-4">
      <div className="flex flex-col justify-center mt-[30px] bg-white p-5 rounded-md">
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

      <div className="bg-white w-full mt-[50px] p-3 rounded-md flex justify-center">
        <button
          onClick={handleLogOut}
          type="button"
          className="bg-primary text-white rounded-md p-1 font-[600] text-[16px] w-[240px] shadow-[0_0px_9px_0px_rgba(0,0,0,0.3)]"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Account;
