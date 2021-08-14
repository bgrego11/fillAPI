import { CardNumberElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid", //"default" or "solid"
  hidePostalCode: true,
  style: {
    base: {
      backgroundColor: "rgb",
      iconColor: "rgb(240, 146, 164)",
      color: "rgb(240, 146, 164)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "rgb(246, 214, 202)"
      },
      "::-ms-clear": {
        color: 'red'
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

function CustomCardNumberElement() {
  return <CardNumberElement options={CARD_ELEMENT_OPTIONS} />;
  // return <CardElement />
}

export default CustomCardNumberElement;