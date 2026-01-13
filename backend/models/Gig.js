const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  ownerId: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: "open" }
});

module.exports = mongoose.model("Gig", gigSchema);