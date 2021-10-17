import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Col, FormGroup, Input, Label, Row, FormFeedback } from 'reactstrap';
import theFillTrayImage from '../../../assets/thefilltray.png';
import GOTO_FEATHER_SVG from '../../../assets/svg/GOTO_FEATHER_SVG';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';



const DonateScreen = (props) => {

  const history = useHistory();

  return (
    <Container>
      <Row>
        <Col>
          <Formik
            initialValues={{
              amount: 0,
              firstName: '',
              lastName: '',
              email: '',
            }}
            validationSchema={Yup.object().shape({
              amount: Yup.number()
                .min(1, 'Amount cannot be less than $1'),
              firstName: Yup.string()
                .required('Required'),
              lastName: Yup.string()
                .required('Required'),
              email: Yup.string()
                .email('Invalid email')
                .required('Required'),

            })}
            onSubmit={(values) => {
              // same shape as initial values
              console.log("VALUES", values);
              history.push({
                pathname: "/donatecheckout",
                state: {
                  donationAmount: values.amount * 100,
                  donationFirstName: values.firstName,
                  donationLastName: values.lastName,
                  donationEmail: values.email,
                }
              })
            }}
          >
            {({ touched, errors }) => {
              // console.log("FIELDS", errors);
              return (
                <Form
                  className="the-fill-text-dark the-fill-form-heading">

                  <legend className="the-fill-form-legend">Donation Amount</legend>
                  <FormGroup row>
                    <Col xs={12} md={6}>
                      <Label for="amount">Amount ($ USD):</Label>
                      <Input
                        name="amount"
                        id="amount"
                        type="number"
                        step="0.01"
                        // placeholder=""
                        invalid={errors.amount && touched.amount}
                        tag={Field}
                      />
                      <FormFeedback>{errors.amount}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <legend className="the-fill-form-legend">Personal Info</legend>
                  <FormGroup row>
                    <Col xs={12} md={6}>
                      <Label for="firstName">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        // placeholder=""
                        invalid={errors.firstName && touched.firstName}
                        tag={Field}
                      />
                      <FormFeedback>{errors.firstName}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs={12} md={6}>
                      <Label for="lastName">Last Name
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder=""
                        invalid={errors.lastName && touched.lastName}
                        tag={Field}
                      />
                      <FormFeedback>{errors.lastName}</FormFeedback>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col xs={12} md={6}>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        invalid={errors.email && touched.email}
                        tag={Field}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs={12} md={6}>
                      <GOTO_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />
                      <Button
                        className="the-fill-app-button"
                        type="submit">
                        Go to payment
                      </Button>
                    </Col>
                  </FormGroup>

                </Form>
              )
            }
            }
          </Formik>
        </Col>
        <Col xs={12} md={4}>
          <img width="100%" src={theFillTrayImage} alt="Fill Tray" />
        </Col>
      </Row>
    </Container>
  )
}

export default DonateScreen;