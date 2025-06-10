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
  status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Interviewed", "Rejected", "Hired"],
    default: "Applied",
  },
});
const Candidate = mongoose.model("candidate", CandidateSchema);
export default Candidate;
