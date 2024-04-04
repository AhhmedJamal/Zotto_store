import { Link } from "react-router-dom";
import Image from "../assets/signUp.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { doc, setDoc } from "firebase/firestore";
// Define the SignUp component
const SignUp = () => {
  // State variables for email, password, and router navigation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  // Handle function for sign up
  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    if (name && email && pass && passConfirmation) {
      // Create a new user and handle success
      if (pass === passConfirmation) {
        createUserWithEmailAndPassword(auth, email, pass)
          .then(async ({ user }) => {
            try {
              const signInMethods = await fetchSignInMethodsForEmail(
                auth,
                user.email
              );

              if (!signInMethods.length > 0) {
                try {
                  await setDoc(doc(db, "users", user.email), {
                    id: user.uid,
                    name: name,
                    email: user.email,
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
            // Reset email and password fields

            // Navigate to the login page
            toast.success("Done Create Account", {
              position: toast.POSITION.TOP_CENTER,
              className: "text-[15px]",
              autoClose: 1500,
            });
            setTimeout(() => {
              setName("");
              setEmail("");
              setPass("");
              setPassConfirmation("");
              router("/login");
            }, 3000);
          })
          .catch(() => {
            toast.error("The Email Found !", {
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
    <div className="w-[70%] h-[95vh] m-auto flex justify-center gap-3 items-center flex-col lg:flex-row relative">
      <ToastContainer />
      <IoMdArrowBack
        size={30}
        className="md:hidden absolute left-[-40px] top-5 p-[2px] self-start bg-gray-200 rounded-lg text-gray-800"
        onClick={() => {
          router(-1);
        }}
      />
      <img src={Image} alt="Image-SignUp" className="w-[70%] lg:w-[40%]" />

      <form
        className="w-full gap-4 flex flex-col  md:ml-8"
        onSubmit={handleSignUp}
      >
        <h1 className="font-bold text-[30px] text-center">Sign Up</h1>
        {/* Name input */}
        <input
          type="text"
          placeholder="Name"
          className="input border outline-none w-full p-1 rounded-md text-[14px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="input border outline-none w-full p-1 rounded-md text-[14px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="input border outline-none w-full p-1 rounded-md text-[14px]"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        {/* Password confirmation input */}
        <input
          type="password"
          placeholder="Confirmation Password"
          className="input border outline-none w-full p-1 rounded-md text-[14px]"
          value={passConfirmation}
          onChange={(e) => setPassConfirmation(e.target.value)}
          required
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
        </button>{" "}
      </form>
    </div>
  );
};

// Export the SignUp component
export default SignUp;
