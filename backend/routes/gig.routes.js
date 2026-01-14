import express from "express";
import Gig from "../models/Gig.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================= GET OPEN GIGS (with search) ================= */
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    const query = { status: "open" };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query).sort({ createdAt: -1 });
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
});

/* ================= CREATE GIG ================= */
router.post("/", authMiddleware, async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user._id,
    status: "open",
  });

  res.json(gig);
});

/* ================= MY GIGS (MUST BE BEFORE :id) ================= */
router.get("/mine", authMiddleware, async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.user._id });
  res.json(gigs);
});

/* ================= GET GIG BY ID ================= */
router.get("/:id", authMiddleware, async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) return res.status(404).json({ message: "Gig not found" });
  res.json(gig);
});

export default router;