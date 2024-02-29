const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "Users" },
  products:[{
    item:{ type: mongoose.Types.ObjectId, ref: "Product" }, 
    count:{ type: Number,require: true}, 
}],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
  shippingAddress: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Orders", orderSchema);

module.exports = { Order };
