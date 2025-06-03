import express from "express";
const router = express.Router();

import { register, login, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

// Register new user
router.post("/register", register);

// Login
router.post("/login", login);

// Get profile (protected)
router.get("/profile", protect, getProfile);

export default router;
