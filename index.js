const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get('/', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10,
    currency: "USD",
  });
  res.status(200).send({client_secret: paymentIntent.client_secret});
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})