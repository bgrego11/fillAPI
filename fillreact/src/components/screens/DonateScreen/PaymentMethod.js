import React, { useParams } from 'react';

import DonateCheckoutScreen from './DonateCheckoutScreen';
import DonateOfflineScreen from './DonateOfflineScreen';

const PaymentMethod = (props) => {

  // const seriesID = props.match.params.seriesID;
  // const seriesData = props.location.state;

  let paymentMethod = props.match.params.paymentMethod;
  let donationAmount = props.location.state.donationAmount;
  let donationEmail = props.location.state.donationEmail;
  let donationfirstName = props.location.state.firstName;

  //let params = useParams();
  // let { paymentMethod } = useParams();
  // console.log("PAYMENT METHOD");
  // console.log();

  console.log("IN PAYMENT METHOD: " + donationEmail)

  return (


    < div >
      {
        paymentMethod === 'electronicpayment'
          ? <DonateCheckoutScreen
            donationAmount={donationAmount}
            donationEmail={donationEmail}
          />
          : <DonateOfflineScreen donationAmount={donationAmount} />
      }

    </div >
  )

}

export default PaymentMethod;