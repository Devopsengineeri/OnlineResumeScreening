import express from "express";
const router = express.Router();

import {
  addCandidate,
  getAllCandidates,
  // getCandidateById,
  // updateCandidate,
} from "../controllers/candidateController.js";

import { authorize, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
// import parseResumeMiddleware from "../middleware/parserMiddleware.js";

// Upload + Add Candidate
router.post(
  "/",
  protect,
  authorize("admin", "recruiter", "hr"),
  upload.single("resume"),
  // parseResumeMiddleware,
  addCandidate
);

// Get all candidates
router.get(
  "/",
  protect,
  authorize("admin", "recruiter", "hr"),
  getAllCandidates
);

// Get single candidate
// router.get("/:id", protect, authorize("admin", "recruiter"), getCandidateById);

// Update candidate
// router.put("/:id", protect, authorize("admin"), updateCandidate);

export default router;
