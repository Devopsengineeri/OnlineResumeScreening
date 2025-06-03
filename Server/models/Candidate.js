import mongoose from "mongoose";
const CandidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
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
