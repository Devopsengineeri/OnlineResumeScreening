import pdfParse from "pdf-parse"; // PDF files ko text me convert
import fs from "fs";
import path from "path";
import textract from "textract";
const resumeParser = async (fullPath) => {
  // const fullPath = path.resolve(filePath); // ✅ Is line ko uncomment karo ya likho properly

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found at path: ${fullPath}`);
  }

  const dataBuffer = fs.readFileSync(fullPath);
  const pdfData = await pdfParse(dataBuffer);
  const text = pdfData.text.toLowerCase();

  const extracted = {
    name: extractName(text),
    email: extractEmail(text),
    skills: extractSkills(text),
    phone: extractPhone(text),
    experience: extractExperience(text),
  };

  return extracted;
};

export default resumeParser;
