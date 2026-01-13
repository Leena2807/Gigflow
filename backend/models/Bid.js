const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  gigId: mongoose.Schema.Types.ObjectId,
  freelancerId: mongoose.Schema.Types.ObjectId,
  message: String,
  price: Number,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Bid", bidSchema);