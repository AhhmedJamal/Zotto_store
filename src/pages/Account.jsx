import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Account = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [click, setClick] = useState("");
  const inputRef = useRef("");

  const auth = getAuth();

  const handleName = () => {
    setClick((pre) => !pre);
    localStorage.setItem("name", name);
  };
  const handleClick = () => {
    setClick((pre) => !pre);
    inputRef.current?.focus();
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      }
      setName(localStorage.getItem("name"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="px-4">
      <div className="flex flex-col justify-center  mt-[30px] bg-white p-5 rounded-md">
        <div className="flex  items-center relative gap-2">
          <FaRegUserCircle size={70} />

          <div>
            {!click ? (
              <FaRegPenToSquare
                onClick={handleClick}
                size={30}
                className="absolute right-[-10px]"
              />
            ) : (
              <MdOutlineDone
                onClick={handleName}
                size={32}
                className="absolute right-[-8px] "
              />
            )}
            {click ? (
              <input
                ref={inputRef}
                className="p-1 border-2 border-primary rounded-lg outline-none w-[130px]"
                type="text"
                id="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <h1 className="font-bold text-xl mb-1">{name}</h1>
            )}
            <h2>{email}</h2>
          </div>
        </div>
      </div>
      <div className="bg-white w-full mt-3 p-2 rounded-md">
        <Link to={"/forget"}>Change Password</Link>
      </div>
    </div>
  );
};

export default Account;
