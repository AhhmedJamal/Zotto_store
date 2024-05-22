import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Model from "./Model";
import Checkout from "./Checkout";

// eslint-disable-next-line react/prop-types
const CartCheckout = ({ total, items }) => {
  const [countItems, setCountItems] = useState(0);
  const [showModel, setShowModel] = useState(false);
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
    <div className=" border sticky top-[100px] border-blue-gray-100 h-fit w-[95%] m-auto lg:w-[40%]  p-5 mt-6">
      <b>Order Summary</b>
      <div className="h-[45px] max-w-[100%] m-auto mt-3">
        <input
          type="search"
          name="discount"
          className="h-full w-[70%] border rounded-sm px-4"
          placeholder="Coupon Code"
        />
        <button className="h-full w-[30%] bg-primary text-white p-2 rounded-sm uppercase">
          APPLY
        </button>
      </div>
      <div className="flex items-center justify-between my-3 text-gray-600 ">
        <div className="text-[15px] ">Subtotal({countItems} items)</div>

        <span> EPG {total}</span>
      </div>
      <hr className="h-[2px] bg-gray-300 my-3" />

      <div className="bg-white p-2 border-2 font-bold">total: EPG {total} </div>

      <button
        disabled={items === 0 ? true : false}
        onClick={() => setShowModel(true)}
        className={`${
          items === 0 ? "opacity-65" : "opacity-100"
        } bg-primary text-white p-1 rounded-sm w-full h-[50px] mt-3 uppercase`}
      >
        CheckOut
      </button>

      {showModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setShowModel(false)}
          className="fixed top-0 left-0 w-full h-screen bg-[#00000090] flex justify-center items-center"
        >
          <Model>
            <Checkout />
          </Model>
        </motion.div>
      )}
    </div>
  );
};

export default CartCheckout;
