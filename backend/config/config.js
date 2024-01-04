require("dotenv").config();

const config = {
  CREDENTIALS: process.env.CREDENTIALS,
  DOMAIN: process.env.DOMAIN,
  ENDPOINT_SECRET: process.env.ENDPOINT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  STRIPE_SECRET_TEST: process.env.STRIPE_SECRET_TEST,
};

module.exports = config;
