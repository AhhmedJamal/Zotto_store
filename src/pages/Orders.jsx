import { useEffect } from "react";
import Image from "/assets/order.svg";
import { useSelector } from "react-redux";
const Orders = () => {
  // eslint-disable-next-line no-unused-vars

  const { orders } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(orders);
  }, []);
  return (
    <div>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-blue-gray-600 font-bold text-[20px] h-[70vh] bg-white p-6 m-2 mt-2 rounded-lg">
          <img src={Image} alt="image-order" width={230} />
          <h1>No Orders yet !!</h1>
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Orders</h1>
          {orders.map((order) => (
            <div key={order.id} className="border bg-white rounded-md p-4 mb-4">
              <h2 className="text-lg mb-2 font-bold">
                Id Order :
                <span className="text-gray-700 font-normal ">
                  {order.randomName}
                </span>
              </h2>
              {order.items.map((item) => (
                <div key={item.uid} className="flex items-center mb-2 text-sm">
                  <img
                    src={item.img}
                    alt={item.description}
                    className="w-16  rounded-md mr-2"
                  />
                  <div>
                    <p className="font-semibold">{item.description}</p>
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold">{item.price}</h2>
                      <p className="ml-2">x {item.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
