import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/login.svg";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";

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
        .then(({ user }) => {
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

  // Render the Login component
  return (
    <div className="w-[70%] h-[100vh] m-auto flex justify-center gap-3 items-center flex-col lg:flex-row ">
      <ToastContainer />
      <img src={Image} alt="Image-Login" className="w-[90%] lg:w-[50%]" />

      <form
        className="w-full gap-4 flex flex-col md:ml-8 "
        onSubmit={handleLogin}
      >
        <h1 className="font-bold text-[30px] text-center">Log In</h1>
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="input border outline-none w-full p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="input border outline-none w-full p-2 rounded-md"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {/* Link to sign up page */}
        <Link
          to="/signUp"
          className="text-primary font-bold rounded-md p-1 text-[12px] underline text-end"
          replace={true}
        >
          Create your Zutto account
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
      </form>
    </div>
  );
};

// Export the Login component
export default Login;
