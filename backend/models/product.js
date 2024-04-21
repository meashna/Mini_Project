const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productCategory: { type: String, required: true },
  productImage: { type: String },
  productPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "not available"],
    default: "available",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
