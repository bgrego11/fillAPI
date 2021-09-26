import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
// import './stylesStripe.css';

function StripeCheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  // const [extraInfo, setExtraInfo] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  // })

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: [{ donation: props.donationAmount }] })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("CLIENT SECRET");
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
      receipt_email: email,
      // shipping: {
      //   name: "GHASSAN NASR",
      // }
      // billing_details: {
      //   email: email,
      //   name: "GHASSAN NASR",
      // }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  // const handleExtraInfo = event => {
  //   console.log("TARGET NAME: " + event.target.name);
  //   setExtraInfo(() => { return { ...extraInfo, [event.target.name]: event.target.value } })
  // }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      Your donation: ${props.donationAmount}

      {/* <div onChange={handleExtraInfo}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" id="lastName" />
      </div> */}

      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}

export default StripeCheckoutForm;
