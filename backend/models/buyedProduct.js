const mongoose = require("mongoose");

const boughtProductSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  quantity: { type: Number, min: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("BuyedProduct", boughtProductSchema);
