import React, { useState } from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { Button, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap';
import PaymentMethod from './PaymentMethod';



const DonateScreen = (props) => {

  const [donationAmount, setDonationAmount] = useState(0);
  const [donationType, setDonationType] = useState('');

  let { path, url } = useRouteMatch();

  let test = props.match.params;
  if (test) {
    console.log("TESTING PARAMS", test);
  }


  const handlePaymentType = event => {
    setDonationAmount(event.target.value);
    setDonationType(event.target.id);
    console.log(event.target.value);
  }
  const updateCustomAmount = event => {
    setDonationAmount(event.target.value);
  }

  return (

    <React.Fragment>
      {/* <Form>
        <FormGroup fieldset>
          <legend>Fields</legend>
          <Label>
            <Input type='text' />{''}
            Name
          </Label>
        </FormGroup>
      </Form> */}
      <Form >
        <FormGroup>
          <label htmlFor="donatetype">Amount ($ USD):</label>
          <input
            type="number"
            id="donatetype"
            min="0.01"
            step="0.01"
            max="2500"
            value={donationAmount}
            onChange={updateCustomAmount}
          />
        </FormGroup>
        <FormGroup tag="fieldset">
          <label>Select amount type:</label>
          <FormGroup check>
            <Label check>
              <Input
                onChange={handlePaymentType}
                id="dtype1"
                type="radio"
                name="donatetype"
                value={15}
              />{' '}
              <span className="the-fill-radio-text">Donation for a Journey Journal</span>
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                onChange={handlePaymentType}
                id="dtype2"
                type="radio"
                name="donatetype"
                value={45}
              />{' '}
              Donation for a Planner
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                onChange={handlePaymentType}
                id="dtype3"
                type="radio"
                name="donatetype"
                value={1}
              />{' '}
              $1.00
            </Label>
          </FormGroup>
          <FormGroup check>
            <div style={{ display: 'flex' }}>
              <Label check>
                <Input
                  onChange={handlePaymentType}
                  id="dtype4"
                  type="radio"
                  name="donatetype"
                  value={0}
                />{' '}
                Give a custom amount:
              </Label>
              <FormGroup>
                <Input
                  onChange={updateCustomAmount}
                  id="customamount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  name="donatetype"
                  disabled={donationType !== 'dtype4' && true}
                  style={{ width: "10rem", height: "2rem" }}
                  className="border-top-0 border-left-0 border-right-0 ml-3 mb-2"
                />
              </FormGroup>
            </div>
          </FormGroup>
          {/* <div>
          <Button
            className="the-fill-app-button"
            tag={Link} to={{
              pathname: `/donatecheckout`,
              state: donationAmount,
            }}
          >
            Electronic Payment
          </Button>
          <Button className="the-fill-app-button">Offline Payment</Button>
        </div> */}
        </FormGroup>


      </Form>

      <ul>
        <li>
          {/* <Link to={`${url}/offlinepayment`}>Offline Payment</Link> */}
          <Link to={{
            pathname: `${url}/offlinepayment`,
            state: donationAmount * 100,
          }} >Offline Payment</Link>
        </li>
        <li>
          {/* <Link to={`${url}/electronicpayment`}>Electronic Payment</Link> */}
          <Link to={{
            pathname: `${url}/electronicpayment`,
            state: donationAmount * 100,
          }} >Electronic Payment</Link>
        </li>
      </ul>

      <Switch>
        {/* <Route exact path={path}>
          <h3>Please select a method of payment</h3>
        </Route> */}
        <Route path={`${path}/:paymentMethod`} component={PaymentMethod}>
          {/* <PaymentMethod paymentAmount={donationAmount} /> */}
        </Route>
      </Switch>


    </React.Fragment>
  )
}

export default DonateScreen;