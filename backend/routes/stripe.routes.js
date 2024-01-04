const router = require("express").Router();
const {
  createCheckOutSession,
  webhook,
} = require("../controllers/stripe.controllers");

router.post("/create-checkout-session", createCheckOutSession);
router.post("/webhook", webhook);

module.exports = router;
