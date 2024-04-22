const mongoose = require("mongoose");
const User = require("./user");

const buyerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  buyedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Buyer = mongoose.model("Buyer", buyerSchema);
module.exports = Buyer;
