import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./database/connection.js";
import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
// import interviewRoutes from "./routes/interviewRoutes.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
database();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);

// app.use("/api/interviews", interviewRoutes);
// Static folder for resume uploads (optional)
// app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => console.log(`Server is Running: ${PORT}`));
