const express = require("express");
const app = express();
// This is your real test secret API key.
// const stripe = require("stripe")
//   ("sk_test_51JKnD2KOLLwCfNqhKcj2EUT9ESqMTNK3UoT79kI8jCQhfaYAiYlqXUW50IW0f2rWMLvtSEMusFW14CmVcHxGVFx000c3qISPoU");

const stripe = require("stripe")
  ("sk_test_xrJpzaL4Sue6z1ZWJ7F4EJAH000kd03yW2");


app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(Number(items[0].donation));
  return items[0].donation;
};

app.post("/create-payment-intent", async (req, res) => {
  console.log("API call made.");
  const { items } = req.body;
  console.log(items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(calculateOrderAmount(items)),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
