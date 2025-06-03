import Candidate from "../models/Candidate.js";
import resumeParser from "../services/resumeParser.js";
// import calculateMatchScore from "../services/matchScore.js";
import fs from "fs";
import path from "path";
export const addCandidate = async (req, res) => {
  try {
    // const { name, email, phone, experience } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Resume file not uploaded" });
    }
    // const resumePath = req.file.path.replace(/\\/g, "/");
    // const resumeAbsolutePath = path.resolve(__dirname, "../" + resumePath);
    // console.log("Resolved resume path:", resumeAbsolutePath);
    // if (!fs.existsSync(resumeAbsolutePath)) {
    //   return res
    //     .status(404)
    //     .json({ message: "Resume file not found on server." });
    // }
    // console.log(resumeParser, "aaaaqqqqqq");
    const parsedData = await resumeParser(req.file.path); // ✅ Yeh line sirf API call pe chalegi

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      skills: parsedData.skills || skills,
      experience: parsedData.experience || experience,
      resumeUrl: resumePath,
    });

    res.status(201).json(candidate);
  } catch (error) {
    console.error("Add Candidate Error:", error.message); // ⬅️ Error logging helpful
    res.status(500).json({ message: "Error creating candidate" });
  }
};

// Get all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching candidates" });
  }
};

// Get one
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    res.json(candidate);
  } catch (err) {
    res.status(404).json({ message: "Candidate not found" });
  }
};

// Update candidate
export const updateCandidate = async (req, res) => {
  try {
    const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating candidate" });
  }
};
