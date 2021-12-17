const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const env = require('dotenv').config({path: '.env'});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get('/', async (req, res) => {
    try {
        await stripe.paymentIntents.create({
            amount: 20,
            currency: "usd",
        }).then((result) => {
            console.log(result);
            res.send({client_secret: result.client_secret, err: null});
        }).catch((error) => {
            console.log(error);
            res.send({client_secret: null, err: error});
        })
    }catch (error) {
        res.send(error);
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})