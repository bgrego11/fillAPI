import React, { useParams } from 'react';

import DonateCheckoutScreen from './DonateCheckoutScreen';
import DonateOfflineScreen from './DonateOfflineScreen';

const PaymentMethod = (props) => {

  // const seriesID = props.match.params.seriesID;
  // const seriesData = props.location.state;

  let paymentMethod = props.match.params.paymentMethod;
  let donationAmount = props.location.state;
  //let params = useParams();
  // let { paymentMethod } = useParams();
  // console.log("PAYMENT METHOD");
  // console.log();

  return (
    <div>
      {
        paymentMethod === 'electronicpayment'
          ? <DonateCheckoutScreen donationAmount={donationAmount} />
          : <DonateOfflineScreen donationAmount={donationAmount} />
      }

    </div>
  )

}

export default PaymentMethod;