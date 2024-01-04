const Stripe = require("stripe");
const { createOrder, completeOrder } = require("./orders.controllers");
const {
  DOMAIN,
  ENDPOINT_SECRET,
  STRIPE_SECRET_TEST,
} = require("../config/config");

const stripe = Stripe(STRIPE_SECRET_TEST);

const createCheckOutSession = async (req, res) => {
  let orderId;

  try {
    orderId = await createOrder(req.body.cartItems, req.body.userId);
  } catch (err) {
    console.log(err);
  }

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      orderId: orderId,
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
          // delivers between 5-7 business days
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
          // delivers in exactly 1 business day
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
};

const webhook = (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event, data, eventType;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, ENDPOINT_SECRET);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;

  // handle the checkout.session.completed event

  if (eventType === "checkout.session.expired") {
    console.log("Hello");
  }

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          completeOrder(customer, data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  // return a 200 response to acknowledge receipt of the event
  res.send().end();
};

module.exports = {
  createCheckOutSession,
  webhook,
};
