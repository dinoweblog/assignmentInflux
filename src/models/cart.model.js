const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    code: { type: Number, required: true },
    qty: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalAmt: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
