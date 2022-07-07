const express = require("express");

const itemController = require("./controllers/item.controller");
const cartController = require("./controllers/cart.controller")

const app = express();

app.use(express.json());

app.use("/items", itemController);
app.use("/order", cartController);

module.exports = app;
