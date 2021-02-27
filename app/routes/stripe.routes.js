module.exports = app => {
  
var router = require("express").Router();

const stripe = require('stripe')('sk_test_xrJpzaL4Sue6z1ZWJ7F4EJAH000kd03yW2')

router.post('/charge', async (req, res) => {

  const amt = req.body.amount
  const ccy = req.body.currency
  const src = req.body.source
  const charge = await stripe.charges.create({
    amount: amt,
    currency: ccy,
    source: src
  });


  res.json({ charge: charge  });
});
  
    // // Delete all series
    // router.delete("/", series.deleteAll);
  
    app.use('/stripe', router);
  };