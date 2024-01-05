const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../config/firebase");
const Stripe = require("stripe");
const { STRIPE_SECRET_TEST } = require("../config/config");
const stripe = Stripe(STRIPE_SECRET_TEST);

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

const completeOrder = async (customer, data) => {
  // const lineItems = await stripe.checkout.sessions.listLineItems(data.id);
  // console.log(lineItems);
  const orderRef = db.collection("orders").doc(customer.metadata.orderId);

  await orderRef.update({
    customerId: data.customer,
    subtotal: data.amount_subtotal / 100,
    total: data.amount_total / 100,
    payment_status: data.payment_status,
    shipping: data.customer_details,
    updatedAt: FieldValue.serverTimestamp(),
  });
};

module.exports = {
  createOrder,
  completeOrder,
};
