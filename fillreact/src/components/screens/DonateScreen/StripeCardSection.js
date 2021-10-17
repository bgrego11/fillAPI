import React from 'react';

import { FormGroup, Button } from 'reactstrap';

import { CardElement } from '@stripe/react-stripe-js';

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

const StripeCardSection = ({ isSubmitting, stripe, error, handleChange, succeeded }) => {


  return (

    <FormGroup>
      <legend className="the-fill-form-legend">Credit Card Info</legend>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <Button className="the-fill-stripe-button"
        disabled={!stripe || isSubmitting}
        // disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {isSubmitting ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      {succeeded && <p>Payment success! Thank you!</p>}
      {/* <p className={succeeded ? "result-message" : "result-message hidden"}> */}
      <p className="result-message">
        {`See the result in your`}
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </FormGroup>
  );
}

export default StripeCardSection;