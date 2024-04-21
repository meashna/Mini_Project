// const mongoose = require("mongoose");
// const UserSchema = require("./user"); // Assuming User schema is in User.js

// const BuyerSchema = new mongoose.Schema({
//   ...UserSchema.obj, // Spread UserSchema fields here
//   semester: { type: String },
//   buyedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
// });

// module.exports = mongoose.model("Buyer", BuyerSchema);

const mongoose = require("mongoose");
const User = require("./user");

const buyerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  buyedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Buyer = mongoose.model("Buyer", buyerSchema);
module.exports = Buyer;
