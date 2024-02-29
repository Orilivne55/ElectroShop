const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  products: [
    {
      item: { type: mongoose.Types.ObjectId, ref: "Prodact" },
      count: { type: Number, default: 1 },
    },
  ],
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
});
const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);
module.exports = { ShoppingCart };
