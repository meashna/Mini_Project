const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  role: { type: String, enum: ["buyer", "seller"] },
});

module.exports = mongoose.model("User", userSchema);
