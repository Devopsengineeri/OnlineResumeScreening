import pdfParse from "pdf-parse";
import fs from "fs";

const parseResume = async (filePath) => {
  const dataBuffer = await fs.readFileSync(filePath);
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
