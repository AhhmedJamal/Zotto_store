import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";

import CheckoutForm from "./CheckoutForm";
// eslint-disable-next-line react/prop-types
const CheckoutCard = ({ total, items, totalForPayMentElement }) => {
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
    <>
      <div className="border sticky rounded-lg border-blue-gray-100 h-fit w-[95%] m-auto lg:w-[40%] p-5 mt-3 lg:mt-[34px]">
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
        <hr className="h-[2px] bg-gray-300 my-4" />
        <div className="bg-white p-2 border-2 font-bold">
          Total: EGP {total}
        </div>
        <CheckoutForm totalForPayMentElement={totalForPayMentElement} />
      </div>
    </>
  );
};

export default CheckoutCard;
