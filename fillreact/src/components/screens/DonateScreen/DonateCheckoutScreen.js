
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import { Container } from 'reactstrap';
// import CheckoutForm from './CheckoutForm';
import StripeCheckoutForm from './StripeCheckoutForm';


const promise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
function DonateCheckoutScreen(props) {

  // const donationAmount = props.location.state;
  const donationAmount = props.donationAmount;

  return (
    <Container>
      <div className="App">
        <Elements stripe={promise}>
          <StripeCheckoutForm donationAmount={donationAmount} />
        </Elements>
      </div>
    </Container>
  );
}

export default DonateCheckoutScreen;
