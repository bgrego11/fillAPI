import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
// import './stylesStripe.css';
import { Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import StripeCardSection from "./StripeCardSection";
import SelectField from "./SelectField";

function StripeCheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  // const [processing, setProcessing] = useState('');
  // const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

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
        // console.log("CLIENT SECRET");
        // console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
  }, [props.donationAmount]);

  const handleCardElementsChange = (event) => {
    // Set error message to be shown when the user inputs incorrect payment data
    if (event.error) {
      setError(event.error.message);
    } else {
      setError('');
    }
  };


  // const handleChange = async (event) => {
  //   // Listen for changes in the CardElement
  //   // and display any errors as the customer types their card details
  //   setDisabled(event.empty);
  //   setError(event.error ? event.error.message : "");
  // };

  /*
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: billingCity,
            country: billingCountry,
            line1: billingAdress1,
            line2: billingAddress2,
            postal_code: billingZipCode,
            state: billingState,
          },
          email: props.donationEmail,
          name: `${props.donationFirstName} ${props.donationLastName}`,
          phone: null,
        },
      },
      receipt_email: props.donationEmail,
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
  */


  const onSubmit = async (values, { setSubmitting }) => {
    setError('');
    const isStripeLoading = !stripe || !elements;

    if (isStripeLoading) {
      // Make sure to disable form submission until Stripe has loaded
      setSubmitting(false);
      return;
    }

    try {
      // Create a payment intent and get a client secret from the server
      // Always decide how much to charge on the server side, a trusted environment, as opposed to the client. This prevents malicious customers from being able to choose their own prices.

      /*     
           const {
             data: { client_secret: clientSecret }
           } = await Axios.post('payment/secret', {
             products: cart.products.map((product) => ({
               id: product.id,
               quantity: product.quantity
             })),
             email: values.email
           });
     */
      // Use stripe.confirmCardPayment when the customer submits your payment form. When called, it will confirm the PaymentIntent with data you provide and carry out 3DS or other next actions if they are required.
      const cardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              city: values.billingCity,
              country: values.billingCountry,
              line1: values.billingAdress1,
              line2: values.billingAddress2,
              postal_code: values.billingZipCode,
              state: values.billingState,
            },
            email: props.donationEmail,
            name: `${props.donationFirstName} ${props.donationLastName}`,
            phone: null,
          },
        }
      });

      if (cardPayment.error) {
        setError(cardPayment.error.message);
      } else if (cardPayment.paymentIntent.status === 'succeeded') {
        // afterPaymentSuccess(cardPayment.paymentIntent);
        setSucceeded(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <React.Fragment>
      <Formik
        initialValues={{
          billingCountry: 'US',
          billingAddress1: '',
          billingAddress2: '',
          billingCity: '',
          billingState: '',
          billingZip: '',
        }}
        validationSchema={Yup.object().shape({
          billingCountry: Yup.string()
            .required('Required'),
          billingAddress1: Yup.string()
            .required('Required'),
          billingAddress2: Yup.string()
            .required('Required'),
          billingCity: Yup.string()
            .required('Required'),
          billingState: Yup.string()
            .required('Required'),
          billingZip: Yup.string()
            .required('Required'),
        })}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, touched, errors, values }) => {
          // console.log("FIELDS", values);
          return (
            <Form className="the-fill-text-dark the-fill-form-heading">
              <Row>
                <Col>
                  {
                    `${props.donationFirstName} ${props.donationLastName}, Thank you for your donation of $${props.donationAmount}!`
                  }
                </Col>
              </Row>
              <legend className="the-fill-form-legend">Billing Info</legend>
              <FormGroup row>
                <Col md={6}>
                  <Label for="billingCountry">Country</Label>
                  <Input
                    type="select"
                    name="billingCountry"
                    id="billingCountry"
                    placeholder=""
                    invalid={errors.billingCountry && touched.billingCountry}
                    tag={SelectField}
                  />
                  <FormFeedback>{errors.billingCountry}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={12}>
                  <Label for="billingAddress1">Address 1</Label>
                  <Input
                    type="text"
                    name="billingAddress1"
                    id="billingAddress1"
                    invalid={errors.billingAddress1 && touched.billingAddress1}
                    tag={Field}
                  />
                  <FormFeedback>{errors.billingAddress1}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={12}>
                  <Label for="billingAddress2">Address 2</Label>
                  <Input
                    type="text"
                    name="billingAddress2"
                    id="billingAddress2"
                    placeholder=""
                    // invalid={errors.billingAddress2 && touched.billingAddress2}
                    tag={Field}
                  />
                  {/* <FormFeedback>{errors.billingAddress2}</FormFeedback> */}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="billingCity">City</Label>
                    <Input
                      type="text"
                      name="billingCity"
                      id="billingCity"
                      invalid={errors.billingCity && touched.billingCity}
                      tag={Field}
                    />
                    <FormFeedback>{errors.billingCity}</FormFeedback>

                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="billingState">State</Label>
                    <Input
                      type="text"
                      name="billingState"
                      id="billingState"
                      invalid={errors.billingState && touched.billingState}
                      tag={Field}
                    />
                    <FormFeedback>{errors.billingState}</FormFeedback>

                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="billingZip">Zip</Label>
                    <Input
                      type="text"
                      name="billingZip"
                      id="billingZip"
                      invalid={errors.billingZip && touched.billingZip}
                      tag={Field}
                    />
                    <FormFeedback>{errors.billingZip}</FormFeedback>
                  </FormGroup>
                </Col>
              </FormGroup>
              {/* <Button type="submit">Validate Billing</Button> */}

              <StripeCardSection
                stripe={stripe}
                isSubmitting={isSubmitting}
                error={error}
                handleChange={handleCardElementsChange}
                succeeded={succeeded}
              />
            </Form>
          )
        }}
      </Formik>




      {/* <RSForm id="payment-form" onSubmit={handleSubmit}>

      </RSForm> */}
    </React.Fragment>
  );
}

export default StripeCheckoutForm;
