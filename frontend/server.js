// This is your test secret API key.
import Stripe from "stripe";
const stripe = Stripe(
  "sk_test_51NAMVlB7UN8U8sHYlRxmtHNX6viIETQqQg6SKHZ8IwrpsRyMq6cZTL4CPwDyaREt1e783b0lcwyJSJ6kAl8du0fE00XNOlSogN"
);
import express from "express";
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:5173";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(5173, () => console.log("Running on port 5173"));