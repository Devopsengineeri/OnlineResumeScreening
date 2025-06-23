import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./database/connection.js";
import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import path from "path";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
database();
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/interview", interviewRoutes);

// app.use("/api/interviews", interviewRoutes);
// Static folder for resume uploads (optional)
// app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => console.log(`Server is Running: ${PORT}`));
