// import { ref, types } from "joi";
import mongoose from "mongoose";
const InterviewSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  interviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled", "rejected", "shortlisted"], 
  },
  remarks: { type: String },
});

const Interview = mongoose.model("Interview", InterviewSchema);
export default Interview;
