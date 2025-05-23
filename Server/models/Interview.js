import { ref, types } from "joi";
import mongoose from "mongoose";
const InterviewSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Condidate" },
  interviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  status: { type: String, enum: ["scheduled", "completed", "cancelled"] },
  remarks: String,
});
module.exports = mongoose.Model("Interview", InterviewSchema);
