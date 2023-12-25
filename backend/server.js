require("dotenv").config();

const cors = require("cors");
const express = require("express");
const Stripe = require("stripe");
const { db } = require("./firebase");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

app.use(express.static("public"));
app.use(cors());

app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

const DOMAIN = process.env.DOMAIN;

app.get("/", (req, res) => {
  return res.send("Welcome");
});

app.get("/magazines", async (req, res) => {
  const magazineRef = db.collection("magazines");
  const docs = await magazineRef.get();
  const data = [];
  const xyz = {
    name: "Tunde",
    age: 20,
  };

  console.log(xyz);
  console.log(xyz.name);
  console.log(JSON.stringify(xyz));
  console.log(JSON.stringify(xyz).name);
  console.log(JSON.parse(JSON.stringify(xyz)));
  console.log(JSON.parse(JSON.stringify(xyz)).name);
  docs.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  res.json({ data });
});

app.get("/magazines/:id", async (req, res) => {
  const { id } = req.params;
  const magazineRef = db.collection("magazines").doc(id);
  const doc = await magazineRef.get();
  if (!doc.exists) {
    return res.json({ msg: "No such document!" });
  }
  res.json({ data: { ...doc.data(), id } });
});

app.post("/magazines", async (req, res) => {
  const magazineRef = db.collection("magazines");
  await magazineRef.add(req.body);
  res.send({ msg: "Magazine Added Successfully" });
});

app.patch("/magazines/:id", async (req, res) => {
  const { id } = req.params;
  const magazineRef = db.collection("magazines").doc(id);
  const doc = await magazineRef.update(req.body);
  res.send({ msg: "Magazine Updated Successfully" });
});

app.delete("/magazines/:id", async (req, res) => {
  const { id } = req.params;
  const magazineRef = db.collection("magazines").doc(id);
  const doc = await magazineRef.delete();
  res.send({ msg: "Magazine Deleted Successfully" });
});

app.post("/create-checkout-session", async (req, res) => {
  const products = req.body.cartItems.map((item) => {
    return {
      productId: item.id,
      quantity: item.amount,
    };
  });

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(products),
    },
  });

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
    customer: customer.id,
    mode: "payment",
    success_url: `${DOMAIN}/cart`,
    cancel_url: `${DOMAIN}/cart`,
  });

  res.send({ url: session.url });
});

const createOrder = async (customer, data) => {
  const orderRef = db.collection("orders");
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item.id,
      quantity: item.amount,
    };
  });

  await orderRef.add({
    userId: customer.metadata.userId,
    customerId: data.customer,
    products,
    subtotal: data.amount_subtotal / 100,
    total: data.amount_total / 100,
    payment_status: data.payment_status,
  });
};

const endpointSecret = process.env.ENDPOINT_SECRET;
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event, data, eventType;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;

  // Handle the checkout.session.completed event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          // create order
          createOrder(customer, data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});

app.listen(4000, () => console.log("Running on port 4000"));
