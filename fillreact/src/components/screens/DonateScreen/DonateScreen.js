import React, { useState } from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
// import PaymentMethod from './PaymentMethod';
import theFillTrayImage from '../../../assets/thefilltray.png';
import GOTO_FEATHER_SVG from '../../../assets/svg/GOTO_FEATHER_SVG';
import DonateCheckoutScreen from './DonateCheckoutScreen';



const DonateScreen = (props) => {

  const [donationAmount, setDonationAmount] = useState(0);
  const [donationFirstName, setDonationFirstName] = useState('');
  const [donationLastName, setDonationLastName] = useState('');
  const [donationEmail, setDonationEmail] = useState('');


  let { path, url } = useRouteMatch();

  const updateDonationAmount = event => {
    setDonationAmount(event.target.value);
  }

  const updateDonationEmail = event => {
    // console.log("UPDATE EMAIL: " + event.target.value);
    setDonationEmail(event.target.value);
  }

  const updateDonationFirstName = event => {
    setDonationFirstName(event.target.value);
  }

  const updateDonationLastName = event => {
    setDonationLastName(event.target.value);
  }

  return (

    <React.Fragment>
      <Row>
        <Col>


          <Form className="the-fill-text-dark the-fill-form-heading" row>
            <FormGroup>
              <legend className="the-fill-form-legend">Donation Amount</legend>
              <Row form>
                <Col md={6} sm={12}>
                  <Label for="donatetype">Amount ($ USD):</Label>
                  <Input
                    type="number"
                    id="donatetype"
                    min="0.01"
                    step="0.01"
                    // max="2500"
                    value={donationAmount}
                    onChange={updateDonationAmount}
                  />
                </Col>
              </Row>
            </FormGroup>


            <FormGroup>
              <legend className="the-fill-form-legend">Personal Info</legend>
              <Row form>
                <Col md={6} sm={12}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      type="text"
                      name="text"
                      id="firstName"
                      placeholder=""
                      value={donationFirstName}
                      onChange={updateDonationFirstName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} sm={12}>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                      type="text"
                      name="text"
                      id="lastName"
                      placeholder=""
                      value={donationLastName}
                      onChange={updateDonationLastName}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6} sm={12} xs={12}>
                  <FormGroup>
                    <Label for="donationEmail">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="donationEmail"
                      placeholder=""
                      value={donationEmail}
                      onChange={updateDonationEmail}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>





          </Form>


          <Row>

            <Col>
              <GOTO_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />
              <Button
                tag={Link} to={{
                  pathname: `${url}/electronicpayment`,
                  state: {
                    donationAmount: donationAmount * 100,
                    donationFirstName: donationFirstName,
                    donationLastName: donationLastName,
                    donationEmail: donationEmail,
                  }
                }}
                className="the-fill-app-button"
              >
                Proceed to Payment
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src={theFillTrayImage} alt="Fill Tray" />
            </Col>
          </Row>

        </Col>

        <Col>
          <Row>
            <Col>
              <Switch>
                {/* <Route path={`${path}/:paymentMethod`} component={PaymentMethod}> */}
                <Route path={`${path}/:paymentMethod`} component={DonateCheckoutScreen}>
                </Route>
              </Switch>
            </Col>
          </Row>

        </Col>
      </Row>


    </React.Fragment >
  )
}

export default DonateScreen;