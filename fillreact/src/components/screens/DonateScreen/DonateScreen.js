
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { Button } from 'reactstrap';
import CustomCardNumberElement from './CustomCardNumberElement';
import CustomCardExpiryElement from './CustomCardExpiryElement';
import CustomCardCvcElement from './CustomCardCvcElement';

// import './styles.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      console.log("ELEMENTS IS NULL");
      return;
    }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardNumberElement),
    // });


    const card = elements.getElement(CardNumberElement);
    console.log("CARD: ");
    console.log(card);
    console.log("CARD DONE");
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log("THE TOKEN");
      console.log(result.token);
    }


  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col xs='12' sm='8' md='4' lg='3'>
          <FormGroup>
            <Label className='stripe-form-label'>
              Card Number
            </Label>
            <CustomCardNumberElement />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs='10' sm='8' md='5' lg='3'>
          <FormGroup>
            <Label className='stripe-form-label'>
              Card Expiry
            </Label>
            <CustomCardExpiryElement />
          </FormGroup>
        </Col>
        <Col xs='10' sm='8' md='5' lg='3'>
          <FormGroup>
            <Label className='stripe-form-label'>
              Card CVC
            </Label>
            <CustomCardCvcElement />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button disable={!stripe || !elements}
            small outline className="the-fill-app-button">
            Pay
          </Button>
        </Col>
      </Row>
    </form>
  );
};

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
// console.log("STRIPE KEY: " + process.env.STRIPE_KEY);

const DonateScreen = () => (
  // <div style={{ paddingTop: '100px' }}>
  <Row>
    {/* <Col xs='12' style={{ paddingTop: '100px' }}> */}
    <Col xs='12'>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Col>
  </Row>
);

export default DonateScreen;
