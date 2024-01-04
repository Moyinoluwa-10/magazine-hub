const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../config/firebase");

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

const completeOrder = async (data, id) => {
  const orderRef = db.collection("orders").doc(id);

  await orderRef.update({
    customerId: data.customer,
    subtotal: data.amount_subtotal / 100,
    total: data.amount_total / 100,
    payment_status: data.payment_status,
    updatedAt: FieldValue.serverTimestamp(),
  });
};

module.exports = {
  createOrder,
  completeOrder,
};
