import mongoose from "mongoose";
const CandidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: String,
  status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Interviewed", "Rejected", "Hired"],
    default: "Applied",
  },
  timestamps: true,
});
