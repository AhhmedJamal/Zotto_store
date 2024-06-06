import { useEffect } from "react";
import Image from "/assets/order.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetDataUser } from "../store/user/user";
const Orders = () => {
  const { email, orders } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDataUser(email));
  }, [dispatch, email]);
  return (
    <div>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-blue-gray-600 font-bold text-[20px] h-[70vh] bg-white p-6 m-2 mt-2 rounded-lg">
          <img src={Image} alt="image-order" width={230} />
          <h1>No Orders yet !!</h1>
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            Orders :{" "}
            <span className="text-gray-600 font-normal text-[19px]">
              {orders.length} items
            </span>
          </h1>
          {orders.map((order) => (
            <div
              key={order.id}
              className="border shadow-[0_3px_6px_0px_rgba(0,0,0,0.2)] bg-white rounded-md p-4 pb-1 mb-4"
            >
              <h2 className="text-lg mb-2 font-bold">
                Id Order :
                <span className="text-gray-700 font-normal text-[16px] ml-3">
                  {order.randomName}
                </span>
              </h2>
              {order.items.map((item) => (
                <div
                  key={item.uid}
                  className="flex items-center py-2 text-sm border-t-2 "
                >
                  <img
                    loading="lazy"
                    src={item.img}
                    alt={item.description}
                    className="w-20  rounded-md mr-2"
                  />
                  <div>
                    <p className="font-semibold max-w-[300px] text-[13px]">
                      {item.description}
                    </p>
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold">
                        {item.price.toLocaleString("en-US")}
                      </h2>
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
