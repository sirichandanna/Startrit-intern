import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createReview,
  getReviewsForTarget,
  getMyReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Create review
router.post("/", authMiddleware, createReview);

// Get reviews for a specific job/company/user
router.get("/target", getReviewsForTarget);

// Get reviews created by logged-in user
router.get("/me", authMiddleware, getMyReviews);

// Update own review
router.put("/:id", authMiddleware, updateReview);

// Delete own review
router.delete("/:id", authMiddleware, deleteReview);

export default router;
