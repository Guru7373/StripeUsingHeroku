const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get('/', async (req, res) => {
    console.log("Im here");
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 10,
            currency: "usd",
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
        res.send({client_secret: paymentIntent.client_secret});
    }catch (error) {
        res.send(error);
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})