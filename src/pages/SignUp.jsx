import { Link } from "react-router-dom";
import Image from "../assets/signUp.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";

// Define the SignUp component
const SignUp = () => {
  // State variables for email, password, and router navigation
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  // Handle function for sign up
  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && pass && passConfirmation) {
      // Create a new user and handle success
      if (pass === passConfirmation) {
        createUserWithEmailAndPassword(auth, email, pass)
          .then(() => {
            // Reset email and password fields
            setEmail("");
            setPass("");
            // Navigate to the login page
            toast.success("Done Create Account", {
              position: toast.POSITION.TOP_CENTER,
              className: "text-[15px]",
              autoClose: 1500,
            });
            setTimeout(() => {
              router("/login");
            }, 3000);
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
        toast.error("The password does not match !", {
          position: toast.POSITION.TOP_CENTER,
          delay: 100,
          className: "text-[15px]",
        });
        setLoading(false);
      }
    } else {
      toast.error("Invalid Email or Password!", {
        position: toast.POSITION.TOP_CENTER,
        delay: 100,
        className: "text-[15px]",
      });
      setLoading(false);
    }
  };

  // Render the SignUp component
  return (
    <div className="w-[70%] h-[100vh] m-auto flex justify-center gap-3 items-center flex-col lg:flex-row">
      <ToastContainer />
      <img src={Image} alt="Image-SignUp" className="w-[70%] lg:w-[40%]" />

      <form
        className="w-full gap-4 flex flex-col  md:ml-8"
        onSubmit={handleSignUp}
      >
        <h1 className="font-bold text-[30px] text-center">Sign Up</h1>
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
        {/* Password confirmation input */}
        <input
          type="password"
          placeholder="Confirmation Password"
          className="input border outline-none w-full p-2 rounded-md"
          value={passConfirmation}
          onChange={(e) => setPassConfirmation(e.target.value)}
        />
        {/* Link to the login page */}
        <Link
          to="/login"
          className="text-primary font-bold rounded-md p-1 text-[12px] underline text-end"
          replace={true}
        >
          I have an account in Zutto
        </Link>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-primary text-light rounded-md p-2 font-bold items-center flex justify-center"
        >
          {loading ? (
            <span className="w-[30px] h-[30px] border-[5px] border-[solid] border-[#FFF] [border-bottom-color:transparent] rounded-[50%] inline-block box-border  animate-spin"></span>
          ) : (
            "Join"
          )}
        </button>
      </form>
    </div>
  );
};

// Export the SignUp component
export default SignUp;
