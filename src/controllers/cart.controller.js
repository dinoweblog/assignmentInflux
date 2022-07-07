const express = require("express");

const Cart = require("../models/cart.model");
const Item = require("../models/item.model");

const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.find({ code: id }).lean().exec();

    if (item.length === 0) {
      return res.send({ message: "this item is currently not available" });
    }

    let total = item[0].price * req.body.qty;

    const cart = await Cart.create({
      code: item[0].code,
      qty: req.body.qty,
      unitPrice: item[0].price,
      totalAmt: total,
    });

    return res.send({ cart });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/summarize", async (req, res) => {
  try {
    const cart = await Cart.find().lean().exec();

    let item = [];
    console.log(cart);
    if (cart.length === 0) {
      return res.send({ message: "Empty cart" });
    }

    item.push(cart[0]);

    for (let i = 1; i < cart.length; i++) {
      if (item[0].code === cart[i].code) {
        item[0].qty = item[0].qty + cart[i].qty;
        item[0].totalAmt = item[0].qty + cart[i].totalAmt;
      } else {
        if (!item.includes(cart[i])) {
          item.push(cart[i]);
        }
      }
    }

    return res.send({ item });
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userCart = await Cart.find({ code: id }).lean().exec();

    return res.send({ userCart });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
