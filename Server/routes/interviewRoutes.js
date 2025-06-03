const express = require("express");
const router = express.Router();
const {
  scheduleInterview,
  updateInterviewStatus,
  getAllInterviews,
} = require("../controllers/interviewController.js");

const { protect, authorize } = require("../middleware/authMiddleware.js");

// Schedule new interview
router.post("/", protect, authorize("admin", "recruiter"), scheduleInterview);

// Update status
router.put("/:id", protect, authorize("admin"), updateInterviewStatus);

// Get all interviews
router.get("/", protect, authorize("admin", "recruiter"), getAllInterviews);

export default router;
