import parseResume from "../services/resumeParser.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parseResumeMiddleware = async (req, res, next) => {
  try {
    if (!req.file?.path) return next();

    const resumePath = path.resolve(process.cwd(), req.file.path);
    console.log("🧾 Resume Path:", resumePath);

    if (!fs.existsSync(resumePath)) {
      console.log("❌ File does not exist");
      return res.status(404).json({ message: "Resume not found" });
    }

    const parsed = await parseResume(resumePath);
    req.parsedResume = parsed;

    next();
  } catch (err) {
    console.error("❌ Resume Parse Error:", err.message);
    return res.status(500).json({ message: "Resume parsing failed" });
  }
};
export default parseResumeMiddleware;
