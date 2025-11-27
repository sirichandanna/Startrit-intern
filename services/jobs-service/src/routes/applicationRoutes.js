import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { applyJob, myApplications } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/:id/apply", authMiddleware, applyJob);
router.get("/my", authMiddleware, myApplications);

export default router;
