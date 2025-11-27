import Review from "../models/review.js";

// POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { targetType, targetId, rating, comment } = req.body;

    const review = await Review.create({
      targetType,
      targetId,
      rating,
      comment,
      createdBy: req.user.id,
    });

    return res.json({ msg: "Review created", review });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// GET /api/reviews/target?targetType=job&targetId=...
export const getReviewsForTarget = async (req, res) => {
  try {
    const { targetType, targetId } = req.query;

    if (!targetType || !targetId) {
      return res.status(400).json({ msg: "targetType and targetId required" });
    }

    const reviews = await Review.find({ targetType, targetId })
      .sort({ createdAt: -1 });

    return res.json(reviews);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// GET /api/reviews/me
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    return res.json(reviews);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    let review = await Review.findById(id);
    if (!review) return res.status(404).json({ msg: "Review not found" });

    if (review.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const { rating, comment } = req.body;

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    await review.save();

    return res.json({ msg: "Review updated", review });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ msg: "Review not found" });

    if (review.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await review.deleteOne();
    return res.json({ msg: "Review deleted" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
