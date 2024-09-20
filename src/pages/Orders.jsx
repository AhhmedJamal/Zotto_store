import { useEffect } from "react";
import Image from "/assets/orders.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetDataUser } from "../store/user/user";
import { MdDeleteOutline } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const Orders = () => {
  const { email, orders } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteOrder = (id) => {
    confirmAlert({
      overlayClassName: "alert",
      title: "Are You Sure To Cancel The Order ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const newOrders = orders.filter((item) => item.randomName !== id);
            const docRef = doc(db, "users", email);
            await updateDoc(docRef, {
              orders: [...newOrders],
            }).then(() => {
              dispatch(GetDataUser(email));
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  useEffect(() => {
    dispatch(GetDataUser(email));
  }, [dispatch, email]);
  return (
    <div className="px-2 md:px-0">
      {orders.length == 0 ? (
        <div className="flex flex-col gap-6 items-center justify-center text-blue-gray-600 font-bold text-[20px] h-[70vh] bg-white p-6 my-2 mt-2 rounded-lg">
          <img src={Image} alt="image-order" width={240} />
          <h1 className="text-gray-700">No Orders yet !!</h1>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold my-2">
            Orders :
            <span className="text-gray-600 font-normal text-[19px]">
              {" "}
              {orders.length}
            </span>
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
            {orders.map((order) => (
              <div
                key={order.randomName}
                className="border shadow-[0_3px_6px_-1px_rgba(0,0,0,0.1)] bg-white rounded-md p-4 pb-1 h-fit"
              >
                <div className="flex justify-between mb-2">
                  <h2 className="text-lg mb-2 font-bold">
                    Id Order :
                    <span className="text-gray-700 font-normal text-[16px] ml-3">
                      {order.randomName}
                    </span>
                  </h2>
                  <button className="p-1 bgt h-fit  cursor-pointer hover:shadow-md bg-black text-white rounded-lg hover:text-gray-400 transition-all">
                    <MdDeleteOutline
                      size={25}
                      onClick={() => handleDeleteOrder(order.randomName)}
                    />
                  </button>
                </div>
                {order.items.map((item) => (
                  <div
                    key={item.uid}
                    className="flex items-center justify-center gap-7 py-2 text-sm border-t-2 "
                  >
                    <img
                      loading="lazy"
                      src={item.img}
                      alt={item.description}
                      className="w-20 lg:w-28 rounded-md mr-2"
                    />
                    <div>
                      <p className="font-semibold max-w-[300px] text-[12px] lg:text-[15px] text-gray-900">
                        {item.description}
                      </p>
                      <div className="flex items-center mt-1">
                        <h2 className="text-md font-semibold">
                          {item.price.toLocaleString("en-US")}
                        </h2>
                        <p className="ml-2">x {item.count}</p>
                      </div>
                      <div className="flex justify-end gap-5 text-[#616161] text-[12px] lg:text-[14px] leading-4 line-clamp-none my-2">
                        <div className="flex flex-col md:flex-row">
                          Order Date: <span>{order.dates?.orderDate}</span>
                        </div>
                        <div className="flex flex-col md:flex-row">
                          Delivery Date:
                          <span>{order.dates?.deliveryDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
