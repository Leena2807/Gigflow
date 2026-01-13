const express = require("express");
const router = express.Router();

const Bid = require("../models/Bid");
const Gig = require("../models/Gig");
const auth = require("../middleware/auth.middleware");

// Create bid
router.post("/", auth, async (req, res) => {
  try {
    const bid = await Bid.create({
      ...req.body,
      freelancerId: req.user.id,
      status: "pending"
    });
    res.json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bids for a gig
router.get("/:gigId", auth, async (req, res) => {
  try {
    const bids = await Bid.find({ gigId: req.params.gigId });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Hire freelancer (NO TRANSACTIONS)
router.patch("/:bidId/hire", auth, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const gig = await Gig.findById(bid.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.status !== "open") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    gig.status = "assigned";
    await gig.save();

    bid.status = "hired";
    await bid.save();

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    res.json({ message: "Freelancer hired" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;