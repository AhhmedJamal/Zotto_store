import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CartCheckout = ({ total, items }) => {
  const [countItems, setCountItems] = useState(0);
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
    <div className=" border sticky top-[95px] border-blue-gray-100 h-fit w-[95%] m-auto lg:w-[40%]  p-5 mt-6">
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
      <Link to="/checkout">
        <button className="bg-primary text-white p-1 rounded-sm w-full h-[50px] mt-3 uppercase">
          CheckOut
        </button>
      </Link>
    </div>
  );
};

export default CartCheckout;
