import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalBtn = () => {
  const style = { layout: "vertical" };
  // window.paypal.Buttons().render("#paypal-button-container");
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "10.00", // Replace with your desired amount
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };
  return (
    <PayPalButtons
      style={style}
      disabled={false}
      forceReRender={[style]}
      fundingSource={undefined}
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
};

export default PaypalBtn;
