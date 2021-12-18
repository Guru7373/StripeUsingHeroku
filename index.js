const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const env = require('dotenv').config({path: '.env'});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get('/', async (req, res) => {
    try {   
        await stripe.customers.create({
            name: 'Jenny Rosen',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        });

        await stripe.paymentIntents.create({
            amount: 200,
            currency: "usd",
            description: "JEXtream Account Renewal",
            payment_method_types: ['card'],
            shipping: {
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
              },
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