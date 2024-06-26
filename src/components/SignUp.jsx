import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// eslint-disable-next-line react/prop-types
const SignUp = ({ setSelect }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEyePassword, setIsEyePassword] = useState(false);
  const [isEyePasswordConfirmation, setIsEyePasswordConfirmation] =
    useState(false);

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
                    photoURL: "",
                    favorites: [],
                    orders: [],
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
              setSelect(false);
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

  const handleEyePassword = () => {
    setIsEyePassword(!isEyePassword);
  };
  const handleEyePasswordConfirmation = () => {
    setIsEyePasswordConfirmation(!isEyePasswordConfirmation);
  };
  return (
    <div className="w-[80%] h-[284px] flex justify-center  items-center flex-col lg:flex-row relative">
      <form className="w-full gap-4 flex flex-col  " onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          className="input border outline-none w-full p-2 rounded-md text-[14px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input border outline-none w-full p-2 rounded-md text-[14px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="flex relative">
          <input
            type={isEyePassword ? "text" : "password"}
            placeholder="Password"
            className="input border outline-none w-full p-2 rounded-md text-[14px]"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <div onClick={handleEyePassword}>
            {isEyePassword ? (
              <AiOutlineEyeInvisible
                size={21}
                className="absolute right-2 top-2 text-lightGrey "
              />
            ) : (
              <AiOutlineEye
                size={21}
                className="absolute right-2 top-2 text-lightGrey "
              />
            )}
          </div>
        </div>
        <div className="flex relative">
          <input
            type={isEyePasswordConfirmation ? "text" : "password"}
            placeholder="Confirmation Password"
            className="input border outline-none w-full p-2 rounded-md text-[14px]"
            value={passConfirmation}
            onChange={(e) => setPassConfirmation(e.target.value)}
            required
          />
          <div onClick={handleEyePasswordConfirmation}>
            {isEyePasswordConfirmation ? (
              <AiOutlineEyeInvisible
                size={21}
                className="absolute right-2 top-2 text-lightGrey z-10"
              />
            ) : (
              <AiOutlineEye
                size={21}
                className="absolute right-2 top-2 text-lightGrey z-10"
              />
            )}
          </div>
        </div>
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
