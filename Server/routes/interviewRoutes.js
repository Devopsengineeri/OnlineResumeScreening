import express from "express";
const router = express.Router();
import {
  scheduleInterview,
  updateInterviewStatus,
  getAllInterviews,
  getOneInterview,
} from "../controllers/interviewController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

// Schedule new interview
router.post(
  "/",
  protect,
  authorize("admin", "recruiter", "hr"),
  scheduleInterview
);

// Update status
router.patch("/:id", protect, authorize("admin", "hr"), updateInterviewStatus);

// Get all interviews
router.get("/", protect, authorize("admin", "recruiter"), getAllInterviews);
router.get("/:id", protect, authorize("admin", "recruiter"), getOneInterview);
export default router;
