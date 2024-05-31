import { useState } from "react";
import Image from "/assets/order.svg";
const Orders = () => {
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState([]);
  return (
    <div>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-blue-gray-600 font-bold text-[20px] h-[70vh] bg-white p-6 m-2 mt-2 rounded-lg">
          <img src={Image} alt="image-order" width={230} />
          <h1>No Orders yet !!</h1>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Orders;
