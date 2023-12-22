require("dotenv").config();

const cors = require("cors");
const express = require("express");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const DOMAIN = process.env.DOMAIN;

app.get("/", (req, res) => {
  return res.send("Welcome");
});

app.post("/", (req, res) => {
  res.send({ url: "xyz" });
});

app.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          image: item.image,
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.amount,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${DOMAIN}/checkout-success`,
    cancel_url: `${DOMAIN}/cart`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});

app.listen(4000, () => console.log("Running on port 4000"));
