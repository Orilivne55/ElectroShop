const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  decripion: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  imageUrl: {type: String},
  publicId: {type: String}
});

const Prodact = mongoose.model("Prodact", productSchema);
module.exports = { Prodact };
