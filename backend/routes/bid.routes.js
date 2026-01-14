import express from "express";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================= CREATE BID ================= */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const bid = await Bid.create({
      ...req.body,
      freelancerId: req.user._id,
      status: "pending",
    });

    res.json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET BIDS FOR A GIG ================= */
router.get("/:gigId", authMiddleware, async (req, res) => {
  try {
    const bids = await Bid.find({ gigId: req.params.gigId });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= HIRE FREELANCER ================= */
router.patch("/:bidId/hire", authMiddleware, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const gig = await Gig.findById(bid.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.status !== "open") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // update gig
    gig.status = "assigned";
    await gig.save();

    // update selected bid
    bid.status = "hired";
    await bid.save();

    // reject others
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    res.json({ message: "Freelancer hired" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;