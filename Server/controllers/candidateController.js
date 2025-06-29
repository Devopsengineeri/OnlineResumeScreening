import Candidate from "../models/Candidate.js";
import parsedResume from "../services/resumeParser.js";
import calculateMatchScore from "../services/matchScore.js";

export const addCandidate = async (req, res) => {
  try {
    const filePath = req.file?.path;
    let requiredSkills = req.body.requiredSkills || [];

    if (!filePath) {
      throw new Error("File path not found or file not uploaded.");
    }

    // Convert string to array if sent as stringified JSON
    if (typeof requiredSkills === "string") {
      requiredSkills = JSON.parse(requiredSkills);
    }
    const parsedData = await parsedResume(filePath);

    // Matching score (UI only)
    const { matchedSkills, score } = calculateMatchScore(
      parsedData.skills,
      requiredSkills
    );

    const candidate = await Candidate.create({
      name: parsedData.name,
      email: parsedData.email,
      phone: parsedData.phone,
      skills: parsedData.skills,
      experience: parsedData.experience,
      resumeUrl: filePath.replace(/\\/g, "/"), // normalize path
    });

    res.status(201).json({
      success: true,
      message: "Candidate added successfully!",
      data: candidate,
      matchScore: {
        skillsScore: score,
        matchedSkills,
      },
    });
  } catch (error) {
    console.error("Add Candidate Error:", error.message);
    res.status(500).json({ message: "Error creating candidate" });
  }
};

//get all candidate
export const getAllCandidates = async (req, res) => {
  try {
    const requiredSkills = [
      /* HR ke JD skills yahaan define karo */
    ];
    const candidates = await Candidate.find();

    const enrichedCandidates = candidates.map((candidate) => {
      const { matchedSkills, score } = calculateMatchScore(
        candidate.skills,
        requiredSkills
      );

      return {
        ...candidate.toObject(), // mongoose doc -> plain object
        matchScore: {
          skillsScore: score,
          matchedSkills,
        },
      };
    });

    res.status(200).json({
      success: true,
      message: "Candidates with score",
      data: enrichedCandidates,
    });
  } catch (error) {
    console.error("GetAllCandidates Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get Candidate status
export const getCandidateStats = async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    const shortlisted = await Candidate.countDocuments({
      status: "shortlisted",
    });
    const interview = await Candidate.countDocuments({
      interview: { $exists: true, $ne: null },
    });
    res.status(200).json({
      total,
      shortlisted,
      interview,
    });
  } catch (error) {
    console.error("Error fetching candidate stats:", error);
    res.status(500).json({ message: "Failed to fetch candidate stats" });
  }
};

//  Status all Status

export const allGetStatus = async (req, res) => {
  try {
    const { status } = req.params;
    if (!status) {
      return res.status(400).json({ message: "Status parameter is missing" });
    }

    const filteredStatus = status.toLowerCase();
    let candidates;
    if (status === "all") {
      candidates = await Candidate.find();
    } else {
      candidates = await Candidate.find({ status: filteredStatus });
    }
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Failed to fetch candidates" });
  }
};
