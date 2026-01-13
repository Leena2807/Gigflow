const router = require("express").Router();
const Gig = require("../models/Gig");
const auth = require("../middleware/auth.middleware");
const authMiddleware = require("../middleware/auth.middleware");
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    const query = {
      status: "open",
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query).sort({ createdAt: -1 });
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
});

router.post("/", auth, async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user.id,
    status: "open"
  });
  res.json(gig);
});

router.get("/:id", authMiddleware, async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) return res.status(404).json({ message: "Gig not found" });
  res.json(gig);
});

router.get("/mine", authMiddleware, async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.user._id });
  res.json(gigs);
});

module.exports = router;