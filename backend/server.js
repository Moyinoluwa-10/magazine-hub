const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/config");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use("/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

// routes
const magazineRouter = require("./routes/magazine.routes");
const stripeRouter = require("./routes/stripe.routes");

app.use("/magazines", magazineRouter);
app.use("/stripe", stripeRouter);

app.get("/", (req, res) => {
  return res.send("Welcome");
});
app.get("*", (req, res) => {
  return res.send("Route does not exist");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
