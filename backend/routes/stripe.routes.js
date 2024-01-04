const express = require("express");
const router = require("express").Router();
const {
  createCheckOutSession,
  webhook,
} = require("../controllers/stripe.controllers");

router.post("/create-checkout-session", createCheckOutSession);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
