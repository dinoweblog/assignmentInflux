const express = require("express");

const Item = require("../models/item.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const itemMaster = await Item.find().lean().exec();

    return res.send({ itemMaster });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("", async (req, res) => {
  try {
    const Payload = await Item.create(req.body);

    return res.send({ Payload });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
