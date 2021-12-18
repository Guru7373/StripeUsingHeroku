const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const env = require('dotenv').config({path: '.env'});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get('/', async (req, res) => {
    try {   
        await stripe.customers.create({
            name: 'Guru',
            address: {
                line1: '599 HMT Layout',
                postal_code: '560097',
                city: 'Bangalore',
                state: 'Karnataka',
                country: 'India',
            },
        });

        await stripe.paymentIntents.create({
            amount: 200,
            currency: "usd",
            description: "JEXtream Account Renewal",
            payment_method_types: ['card'],
            shipping: {
                name: 'Guru',
                address: {
                  line1: '599 HMT Layout',
                  postal_code: '560097',
                  city: 'Bangalore',
                  state: 'Karnataka',
                  country: 'India',
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