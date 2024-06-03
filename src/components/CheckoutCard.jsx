import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { removeAllCart } from "../store/cart/cartSlice";
// eslint-disable-next-line react/prop-types
const CheckoutCard = ({ total, items, email }) => {
  const [countItems, setCountItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // dispatch(removeAllCart(id));
  const buyFunction = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://zotto.onrender.com/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice: total.toString().replace(/,/g, ""),
          email,
        }),
      });

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        window.location.href = data.url;
        // لا تقم بإرسال removeAllCart هنا، انتظر نجاح الدفع
        alert("خلصانه");
      } else {
        setLoading(false);
        const errorData = await response.json();
        console.error("Error processing payment:", errorData.error);
        // تحقق مما إذا تم إلغاء الدفع
        if (errorData.error === "payment_canceled") {
          alert("احا");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const calculateTotalItems = () => {
    setCountItems(
      // eslint-disable-next-line react/prop-types
      items.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
      }, 0)
    );
  };

  useEffect(() => {
    calculateTotalItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full h-screen z-10  bg-[#00000090] flex justify-center items-center"
        >
          <span className="rounded-full w-11 h-11 border-4 border-r-transparent animate-spin border-primary"></span>
        </motion.div>
      )}

      <div className="border sticky top-[100px] border-blue-gray-100 h-fit w-[95%] m-auto lg:w-[40%] p-5 mt-6">
        <b>Order Summary</b>
        <div className="h-[30px] max-w-[100%] m-auto flex items-center gap-1">
          <input
            type="search"
            name="discount"
            className="h-full w-[70%] border rounded-sm px-4"
            placeholder="Coupon Code"
          />
          <Button className="h-fit w-[30%] bg-primary text-white rounded-sm uppercase text-[12px] font-bold p-2">
            APPLY
          </Button>
        </div>
        <div className="flex items-center justify-between my-3 text-gray-600">
          <div className="text-[15px]">Subtotal ({countItems} items)</div>
          <span> EGP {total}</span>
        </div>
        <hr className="h-[2px] bg-gray-300 my-3" />
        <div className="bg-white p-2 border-2 font-bold">
          Total: EGP {total}
        </div>
        <Button
          disabled={countItems === 0}
          onClick={buyFunction}
          className={`${
            countItems === 0 ? "opacity-65" : "opacity-100"
          } bg-primary text-white p-1 rounded-sm w-full h-[50px] mt-3 text-[15px] uppercase font-bold`}
        >
          Checkout
        </Button>
      </div>
    </>
  );
};

export default CheckoutCard;
