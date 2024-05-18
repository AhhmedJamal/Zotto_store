import { useDispatch, useSelector } from "react-redux";
import CartEmpty from "/assets/emptyCart.svg";
import CartProduct from "../components/CartProduct";
import CartCheckout from "../components/CartCheckout";
import { useEffect, useState } from "react";
import { getFromLocal } from "../store/cart/cartSlice";
import { auth } from "../config/firebase";

const Cart = () => {
  const user = auth.currentUser;
  const [countProduct, setCountProduct] = useState([]);
  function calculateTotalPrice(cart) {
    // Ensure that the cart is not empty
    if (!cart || cart.length === 0) {
      return 0;
    }

    // Calculate the total price without considering quantity
    const totalPrice = cart.reduce((accumulator, item) => {
      const itemPrice = item.price * item.count || 0; // Assuming each item has a 'price' property
      const itemDiscountPercentage = item.discountPercentage || 0; // Assuming each item has a 'discountPercentage' property, default to 0 if not present

      const discountedPrice = itemPrice * (1 - itemDiscountPercentage / 100);
      return accumulator + discountedPrice;
    }, 0);
    return totalPrice;
  }
  const cart = useSelector((state) => state.cart.items);
  const totalWithDiscount = calculateTotalPrice(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem(`shoppingCart_${user?.uid}`)) || [];
    dispatch(getFromLocal(items));
    setCountProduct(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="mt-4 flex flex-col lg:flex-row justify-between mb-10 relative ">
      <div className="w-[100%] lg:w-[58%] ">
        <span className="text-[13px] md:text-[17px] font-bold sm:ml-0 ml-2 ">
          Shopping Cart:
          <span className="text-gray-500 text-[13px]">
            (items {cart.length})
          </span>
        </span>

        {cart.length !== 0 ? (
          <div className="  flex flex-col place-items-center gap-3 sm:mx-0 mx-2 mt-2 max-h-[62vdh]  overflow-scroll cartScroll">
            {cart.map((product, i) => {
              return (
                <CartProduct
                  key={i}
                  product={product}
                  countProduct={countProduct[i]?.count}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col  items-center justify-center h-[50vh] bg-white m-4 mb-0 rounded-lg">
            <img src={CartEmpty} alt="cart" className="w-[200px]  " />
            <p className="font-bold text-[15px] text-[#37474f]">
              Your cart is empty !!
            </p>
          </div>
        )}
      </div>
      <CartCheckout
        items={cart}
        cart={cart.length}
        total={totalWithDiscount?.toLocaleString("en-US")}
      />
    </div>
  );
};

export default Cart;
// sm:h-[62vh] h-[34vh]  overflow-scroll
