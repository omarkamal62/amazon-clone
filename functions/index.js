const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")(
  "sk_test_51Jed9mKraWggr0WVgEr4B4FRpjNXdc0T0mbS8XGXxPUhp4O5HgzDMdYh0KLrGZxI2J5JIeoxGEq0qMvPrlpJ1lyn00FuWHw61Y"
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM !!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
