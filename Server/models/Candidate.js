import mongoose from "mongoose";
import { type } from "os";
const CandidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  phone: String,
  skills: [String],
  location: String,
  education: String,
  projects: String,
  experience: String,
  resumeUrl: String,
  matchScore: {
    matchingScore: { type: Number, default: 0 }, // 🟢 Groq se
    matchedSkills: { type: [String], default: [] }, // 🟢 Manual matching
    skillsScore: { type: Number, default: 0 }, // 🟢 Manual matching
  },

  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
  },
  status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Interviewed", "Rejected", "Hired"],
    default: "Applied",
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // 👈 Make sure 'Job' model exists
  },
});
const Candidate = mongoose.model("Candidate", CandidateSchema);
export default Candidate;
