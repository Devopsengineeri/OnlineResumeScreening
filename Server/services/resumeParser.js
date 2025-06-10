import fs from "fs";
import pdfParse from "pdf-parse";
import path from "path";

// Extract first non-empty line as name
const extractName = (text) => {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines[0] : "";
};

// Extract email using regex
const extractEmail = (text) =>
  text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)?.[0] || "";

// Extract Indian mobile numbers
const extractPhone = (text) =>
  text.match(/(\+91[-\s]?|0)?[6-9]\d{9}/)?.[0] || "";

// // Skills extracted directly from text (JD-based)
// const extractSkills = (text) => {
//   const words = text.split(/\s|,|\n/).map((w) => w.trim().toLowerCase());
//   const uniqueWords = [...new Set(words)];
//   return uniqueWords.filter((w) => w.length > 2); // basic cleanup
// };

// ✅ Skill match from known list
const extractSkills = (text) => {
  const knownSkills = [
    "html",
    "css",
    "javascript",
    "react",
    "node.js",
    "express",
    "mongodb",
    "redux",
    "git",
    "github",
    "bootstrap",
    "rest api",
    "mysql",
    "typescript",
    ,
    "DOCKER",
    "NAGIOS",
  ];
  return knownSkills.filter((skill) => text.includes(skill.toLowerCase()));
};

// Experience check: if no match, treat as Intern
const extractExperience = (text) => {
  const match = text.match(/(\d+)\s*(\+)?\s*(years|year)/);
  return match ? `${parseInt(match[1])} years` : "Intern";
};

const resumeParser = async (filePath) => {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`❌ File not found: ${fullPath}`);
  }

  const dataBuffer = fs.readFileSync(fullPath);
  const pdfData = await pdfParse(dataBuffer);
  const text = pdfData.text.toLowerCase();

  return {
    name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
    experience: extractExperience(text),
  };
};

export default resumeParser;
