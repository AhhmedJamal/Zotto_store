// CheckoutForm.jsx
import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { removeAllCart } from "../store/cart/cartSlice";

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ totalForPayMentElement }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, email } = useSelector((state) => state.user);
  const router = useNavigate();
  const dispatch = useDispatch();
  const amount = totalForPayMentElement * 1000;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (amount === 0) return;
    fetch("https://zotto.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalForPayMentElement]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: email,
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        // router("/orders");
        // dispatch(removeAllCart(id));
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-2 border p-3">
        <CardElement />
        <Button
          loading={loading}
          className={`bg-primary w-full mt-5  capitalize font-bold text-white py-2 rounded-lg flex justify-center ${
            totalForPayMentElement === 0 && "bg-primary/80"
          }`}
          type="submit"
        >
          <span className="text-[17px]">
            {totalForPayMentElement === 0 ? "No Items To Pay" : "Pay"}
          </span>
        </Button>
      </form>
    </>
  );
};

export default CheckoutForm;
