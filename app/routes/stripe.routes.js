module.exports = app => {
  
var router = require("express").Router();

const stripe = require('stripe')('sk_test_xrJpzaL4Sue6z1ZWJ7F4EJAH000kd03yW2')

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});
  
    // // Delete all series
    // router.delete("/", series.deleteAll);
  
    app.use('/stripe', router);
  };