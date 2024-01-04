require("dotenv").config();

const cors = require("cors");
const express = require("express");
const Stripe = require("stripe");
const { db } = require("./firebase");
const { FieldValue } = require("firebase-admin/firestore");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

app.use(express.static("public"));
app.use(cors());

app.use(express.json());

const DOMAIN = process.env.DOMAIN;
const PORT = process.env.PORT || 4000;
const ENDPOINT_SECRET = process.env.ENDPOINT_SECRET;

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
  await magazineRef.delete();
  res.send({ msg: "Magazine Deleted Successfully" });
});

app.post("/create-checkout-session", async (req, res) => {
  let orderId;
  try {
    orderId = createOrder(req.body.cartItems, req.body.userId);
  } catch (err) {
    console.log(err);
  }
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
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    // custom_text: {
    //   shipping_address: {
    //     message:
    //       "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
    //   },
    //   submit: {
    //     message: "We'll email you instructions on how to get started.",
    //   },
    // },
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${DOMAIN}/checkout`,
    cancel_url: `${DOMAIN}/cart`,
  });

  res.send({ url: session.url });
});

const createOrder = async (cartItems, userId) => {
  const orderRef = db.collection("orders");

  const products = cartItems.map((item) => {
    return {
      productId: item.id,
      quantity: item.amount,
    };
  });

  const res = await orderRef.add({
    userId,
    products,
    payment_status: "pending",
    createdAt: FieldValue.serverTimestamp(),
  });

  return res.id;
};

const completeOrder = async (customer, data, id) => {
  const orderRef = db.collection("orders").doc(id);

  await orderRef.update({
    customerId: data.customer,
    subtotal: data.amount_subtotal / 100,
    total: data.amount_total / 100,
    payment_status: data.payment_status,
    updatedAt: FieldValue.serverTimestamp(),
  });
};

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event, data, eventType;
  console.log("body", req.body);
  console.log("sig", sig);

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, ENDPOINT_SECRET);
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
