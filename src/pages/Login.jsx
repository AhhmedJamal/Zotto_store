import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import SignUp from "../components/SignUp";
import LogoName from "/assets/ZottoLogo.png";
import { auth, db, facebookProvider, googleProvider } from "../config/firebase";


const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(false);
  const [isEyePassword, setIsEyePassword] = useState(false);
  const router = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && pass) {
      // Authenticate user and handle success
      signInWithEmailAndPassword(auth, email, pass)
        .then(async ({ user }) => {
          // Store user token in local storage
          localStorage.setItem(`token=${user.uid}`, user.uid);
          // Reset email and password fields
          setEmail("");
          setPass("");
          // Navigate to the home page
          router("/", { replace: true });
        })
        .catch(() => {
          toast.error("Check Email and Password!", {
            position: toast.POSITION.TOP_CENTER,
            delay: 100,
            className: "text-[15px]",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Invalid Email or Password!", {
        position: toast.POSITION.TOP_CENTER,
        delay: 100,
        className: "text-[15px]",
      });
      setLoading(false);
    }
  };
  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await handleUserAuth(user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      await handleUserAuth(user);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleUserAuth = async (user) => {
    const userDocRef = doc(db, "users", user.email);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      // User exists, do something (e.g., set user info in local storage)
      localStorage.setItem(`token=${user.uid}`, user.uid);
      router("/", { replace: true }); // Assuming you have 'router' imported and it's used for navigation
    } else {
      // User doesn't exist, create a new document for the user
      try {
        await setDoc(userDocRef, {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          favorites: [],
          orders: [],
        });
        localStorage.setItem(`token=${user.uid}`, user.uid);
        console.log("New user added successfully");
        router("/", { replace: true }); // Navigate to a different route after creating the user document
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const handleEyePassword = () => {
    setIsEyePassword(!isEyePassword);
  };

  return (
    <div className="overflow-hidden  w-full h-screen m-auto flex flex-col justify-center items-center gap-5 md:gap-0">
      <ToastContainer />

      <img src={LogoName} alt="Logo" className="w-[200px] md:w-[260px]" />

      <div className="w-[80%] md:w-fit flex justify-center items-center relative ">
        <div className="sm:hidden size-[150px] bg-primary rounded-full absolute -top-12 -left-24 -z-20"></div>
        <div className="sm:hidden size-[150px] bg-primary rounded-full absolute -bottom-12 -right-24 -z-20"></div>
        <div className="relative  lg:mb-0 w-[100%] md:w-[500px] h-[400px] gap-4 flex flex-col justify-center md:border items-center shadow-xl rounded-xl z-10 bg-[rgba(255,_255,_255,_0.35)] [box-shadow:0_8px_32px_0_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[40px]">
          <div className="w-[80%]">
            <div className="text-primary text-[18px] font-bold flex  justify-around cursor-pointer">
              <span
                onClick={() => setSelect(false)}
                className={select ? "text-gray-800" : "text-primary"}
              >
                Sign In
              </span>
              <span
                onClick={() => setSelect(true)}
                className={!select ? "text-gray-800" : "text-primary"}
              >
                Sign Up
              </span>
            </div>
            <div className="bg-gray-800 relative h-1 w-full mt-1 cursor-pointer">
              <span
                className={`bg-primary w-1/2 h-1 absolute transition-all duration-300 ease-in-out ${
                  select ? "left-1/2" : "left-0"
                }`}
              ></span>
            </div>
          </div>
          {select ? (
            <SignUp setSelect={setSelect} />
          ) : (
            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-between items-center w-full gap-4 "
            >
              <input
                type="email"
                placeholder="Email"
                className="input border outline-none w-[80%] p-2 rounded-md text-[15px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex relative w-[80%]">
                <input
                  type={isEyePassword ? "text" : "password"}
                  placeholder="Password"
                  className="input border outline-none w-full p-2 rounded-md text-[15px]"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <div onClick={handleEyePassword}>
                  {isEyePassword ? (
                    <AiOutlineEyeInvisible
                      size={21}
                      className="absolute right-2  top-[10px] text-lightGrey "
                    />
                  ) : (
                    <AiOutlineEye
                      size={21}
                      className="absolute right-2 top-[10px] text-lightGrey "
                    />
                  )}
                </div>
              </div>

              <Link
                to="/forget"
                className="text-gray-700 self-end mr-7 font-bold rounded-md p-1 text-[12px] underline text-end"
              >
                Forgot Password?
              </Link>

              <button
                type="submit"
                className="bg-primary text-light rounded-2xl p-2 font-bold items-center flex justify-center w-[80%]"
              >
                {loading ? (
                  <span className="w-[30px] h-[30px] border-[5px] border-[solid] border-[#FFF] [border-bottom-color:transparent] rounded-[50%] inline-block box-border  animate-spin"></span>
                ) : (
                  "Login"
                )}
              </button>
              <div className="h-[1px] my-2 text-gray-700 bg-gray-500 w-[80%] after:content-['or'] after:font-bold after:border after:border-gray-500  after:relative after:top-[-12px] after:left-[45%] after:bg-[#F7F7FA] after:w-fit after:p-1 after:rounded-full"></div>
              <div className="flex justify-center gap-2 w-full">
                <button
                  aria-label="Button Google"
                  onClick={handleGoogle}
                  type="button"
                  className="bg-gray-200 text-gray-800 capitalize text-[12px] w-[40%] rounded-md p-2 font-bold items-center flex gap-2 justify-center"
                >
                  <FcGoogle size={24} /> Google
                </button>
                <button
                  aria-label="Button Facebook"
                  onClick={handleFacebook}
                  type="button"
                  className="bg-gray-200 text-gray-800 capitalize text-[12px] w-[40%] rounded-md p-2 font-bold items-center flex gap-2 justify-center"
                >
                  <SiFacebook size={24} className="text-[#1877F2]" />
                  Facebook
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
