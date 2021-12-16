const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const stripe = require("stripe")("sk_test_51Jd7JRSBMhNsGas782zfKTFEId3LEER5hoUsX7LTwsboi3uo4Wt8L4LowM5ovzYQdQ58JmoNR6ocZcL2JBTN3apF00oW7p8Ul6");

app.get('/', async (req, res) => {
    try {
        await stripe.paymentIntents.create({
            amount: 10,
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