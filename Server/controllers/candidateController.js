import Candidate from "../models/Candidate.js";
import parsedResume from "../services/resumeParser.js";
import calculateMatchScore from "../services/matchScore.js";
import fs from "fs";
import path from "path";

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
