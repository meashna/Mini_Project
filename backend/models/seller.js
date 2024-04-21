// const mongoose = require("mongoose");
// const UserSchema = require("./user");

// const SellerSchema = new mongoose.Schema({
//   ...UserSchema.obj,
//   availableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//   selledProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
// });

// module.exports = mongoose.model("seller", SellerSchema);

const mongoose = require("mongoose");
const User = require("./user"); // Assuming User model is in user.js

const sellerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  availableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  selledProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
