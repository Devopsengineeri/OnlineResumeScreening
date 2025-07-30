import Candidate from "../models/Candidate.js";
import parseWithGroq from "../services/openaiParser.js";
import calculateMatchScore from "../services/matchScore.js";

export const addCandidate = async (req, res) => {
  try {
    const jdText = req.body.jdText || req.body;
    const requiredSkillsRaw = req.body.requiredSkills;
    const resumePath = req.file?.path;

    if (!jdText || !resumePath) {
      throw new Error("❌ Missing JD text or resume file");
    }

    // 🔐 Safe requiredSkills parse
    let requiredSkills = [];
    try {
      requiredSkills = Array.isArray(requiredSkillsRaw)
        ? requiredSkillsRaw
        : JSON.parse(requiredSkillsRaw || "[]");
    } catch (err) {
      console.error("❌ Error parsing requiredSkills:", err.message);
      requiredSkills = [];
    }

    // ✅ Parse Resume + JD with Groq
    const parsedData = await parseWithGroq(resumePath, jdText);

    // 🔄 Normalize function
    const normalize = (skill) =>
      skill
        .toLowerCase()
        .replace(/[^a-z0-9]/g, " ") // emojis, symbols hata do
        .replace(/\s+/g, " ")
        .trim();

    const resumeSkills = (parsedData.skills || []).map(normalize);
    const normalizedRequiredSkills = requiredSkills.map(normalize);
    // console.log(
    //   normalizedRequiredSkills.filter((skill) => console.log(skill)),
    //   "normalizedRequiredSkillsfilterSkills"
    // );
    const matchedSkills = normalizedRequiredSkills.filter((skill) =>
      resumeSkills.includes(skill)
    );

    const skillsScore =
      normalizedRequiredSkills.length > 0
        ? Math.round(
            (matchedSkills.length / normalizedRequiredSkills.length) * 100
          )
        : 0;
    // ✅ Save Candidate
    const candidate = new Candidate({
      name: parsedData.name,
      email: parsedData.email,
      phone: parsedData.phone,
      experience: parsedData.experience,
      skills: parsedData.skills,
      resumeUrl: resumePath,
      status: resumePath.status,
      matchScore: {
        matchingScore: skillsScore,
        skillsScore,
        matchedSkills,
      },
    });

    await candidate.save();

    res.status(201).json({
      success: true,
      message: "Candidate added successfully!",
      data: candidate,
    });
  } catch (error) {
    console.error("❌ Add Candidate Error:", error.message);
    res.status(500).json({ message: "Failed to add candidate" });
  }
};

//get all candidate
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().populate("jobId");

    res.status(200).json(candidates);
  } catch (error) {
    console.error("GetAllCandidates Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// get Candidate status
export const getCandidateStats = async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    const shortlisted = await Candidate.countDocuments({
      status: { $regex: /^shortlisted$/i },
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
// Get candidates by status
export const getCandidatesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    let queary = {};
    if (status === "interview") {
      queary = { interview: { $exists: true, $ne: null } };
    } else {
      queary = { status: new RegExp(`^${status}$`, "i") };
    }
    const candidates = await Candidate.find(queary);
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates by status:", error);
    res.status(500).json({ message: "Failed to fetch candidates" });
  }
};
