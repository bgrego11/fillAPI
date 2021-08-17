import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid", //"default" or "solid"
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 146, 164)",
      color: "rgb(240, 146, 164)",
      fontSize: "24px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "rgb(246, 214, 202)"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

function CustomCardElement() {
  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
  // return <CardElement />
}

export default CustomCardElement;