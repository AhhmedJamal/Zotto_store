// eslint-disable-next-line react/prop-types
const CartCheckout = ({ cart, total }) => {
  return (
    <div className=" border sticky top-[95px] border-blue-gray-100 h-fit w-[95%] m-auto lg:w-[40%]  p-4 mt-8">
      <b>Order Summary</b>
      <div className="h-[45px] max-w-[100%] m-auto mt-3">
        <input
          type="search"
          name="discount"
          className="h-full w-[70%] border rounded-sm px-4"
        />
        <button className="h-full w-[30%] bg-primary text-white p-2 rounded-sm uppercase">
          APPLY
        </button>
      </div>
      <div className="flex items-center justify-between my-3 text-gray-600 ">
        <div className="text-[15px] ">Subtotal({cart} items)</div>
        <span>${total}</span>
      </div>
      <hr className="h-[2px] bg-gray-300 my-3" />
      <div className="bg-white p-2 border-2">total: ${total} </div>
      <button className="bg-primary text-white p-1 rounded-sm w-full h-[50px] mt-3 uppercase">
        CheckOut
      </button>
    </div>
  );
};

export default CartCheckout;
