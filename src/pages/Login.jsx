import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/login.svg";
import { useState } from "react";
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, facebookProvider, googleProvider } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
// Define the Login component
const Login = () => {
  // State variables for email, password, and router navigation
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  // Handle function for login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && pass) {
      // Authenticate user and handle success
      signInWithEmailAndPassword(auth, email, pass)
        .then(async ({ user }) => {
          // Store user token in local storage
          localStorage.setItem("token", user.uid);
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
      const { user } = await signInWithPopup(auth, googleProvider);

      // Check if the user exists in Firestore
      const userDocRef = doc(db, "users", user.email);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // User exists, do something (e.g., set user info in local storage)
        localStorage.setItem("token", user.uid);
        console.log("User logged in successfully");
        router("/", { replace: true }); // Assuming you have 'router' imported and it's used for navigation
      } else {
        // User doesn't exist, create a new document for the user
        await setDoc(userDocRef, {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          favorite: [],
          cart: [],
        });
        localStorage.setItem("token", user.uid);
        console.log("New user added successfully");
        router("/", { replace: true }); // Navigate to a different route after creating the user document
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      try {
        const signInMethods = await fetchSignInMethodsForEmail(
          auth,
          user.email
        );

        if (!signInMethods) {
          try {
            await setDoc(doc(db, "users", user.email), {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              favorite: [],
              cart: [],
            });

            console.log("Document added successfully");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  // Render the Login component
  return (
    <div className="w-[70%] h-[90vh] m-auto flex justify-center gap-3 items-center flex-col lg:flex-row ">
      <ToastContainer />
      <img src={Image} alt="Image-Login" className="w-[70%] lg:w-[40%]" />

      <form
        className="w-full gap-4 flex flex-col md:ml-8 "
        onSubmit={handleLogin}
      >
        <h1 className="font-bold text-[30px] text-center">Sign In</h1>
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="input border outline-none w-full p-1 rounded-md text-[15px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="input border outline-none w-full p-1 rounded-md text-[15px]"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        {/* Link to Forgot Password */}
        <Link
          to="/forget"
          className="text-gray-700 font-bold rounded-md p-1 text-[12px] underline text-end"
        >
          Forgot Password?
        </Link>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-primary text-light rounded-md p-2 font-bold items-center flex justify-center"
        >
          {loading ? (
            <span className="w-[30px] h-[30px] border-[5px] border-[solid] border-[#FFF] [border-bottom-color:transparent] rounded-[50%] inline-block box-border  animate-spin"></span>
          ) : (
            "Login"
          )}
        </button>
        <div className="h-[1px] my-2 bg-gray-500 w-full after:content-['or'] after:font-bold after:border after:border-gray-600  after:relative after:top-[-12px] after:left-[45%] after:bg-[#F7F7FA] after:w-fit after:p-1 after:rounded-full"></div>
        <div className="flex justify-center gap-2">
          <button
            onClick={handleGoogle}
            type="button"
            className="bg-gray-300 text-gray-800 text-[14px]  rounded-md p-2 font-bold items-center flex gap-2 justify-center"
          >
            <FcGoogle size={24} />
          </button>
          <button
            onClick={handleFacebook}
            type="button"
            className="bg-gray-300 text-gray-800 text-[14px]  rounded-md p-2 font-bold items-center flex gap-2 justify-center"
          >
            <SiFacebook size={24} className="text-[#1877F2]" />
          </button>
        </div>
        {/* Link to sign up page */}
        <Link
          to="/signUp"
          className="text-primary font-bold rounded-md p-1 text-[12px] underline text-center"
        >
          Create your Zutto account
        </Link>
      </form>
    </div>
  );
};

// Export the Login component
export default Login;
