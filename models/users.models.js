const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, required: false },
  id: { type: String, required: false },
  ShopCartId: {type: mongoose.Types.ObjectId, ref: "ShoppingCart" },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
