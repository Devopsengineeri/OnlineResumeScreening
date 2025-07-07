import axios from "axios";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import dotenv from "dotenv";

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("❌ GROQ_API_KEY is undefined. Check your .env file.");
}

const parseWithGroq = async (resumePath, jdTextRaw) => {
  /* ---------- 1. Load & trim resume PDF ---------- */
  const fullPath = path.resolve(resumePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`❌ Resume not found at ${fullPath}`);
  }
  const resumeBuffer = fs.readFileSync(fullPath);
  const { text: pdfText } = await pdfParse(resumeBuffer);
  const resumeText = pdfText.slice(0, 5000); // limit to ~5 k chars

  /* ---------- 2. Prepare JD safely ---------- */
  const jdString =
    typeof jdTextRaw === "string" ? jdTextRaw : JSON.stringify(jdTextRaw ?? {});
  const trimmedJD = jdString.slice(0, 3000);

  /* ---------- 3. Build prompt ---------- */
  const prompt = `
  Instructions:
ONLY return a JSON object.
Do NOT include any explanations, notes, or text outside the JSON.
If a field is missing in the resume, use null or empty values.
You are an expert recruiter assistant. Read the following resume and job description (JD). Extract:
- Name
- Email
- Phone (must be 10-digit number, ignore if not present)
- Experience (in years or say 'Intern')
- Skills (list)
- Matching Score between resume and JD (0-100)
- Matched Skills (common between resume and JD)


⚠️ Strict Rule: Return only one unique key per field, no duplication.
Format output as *pure JSON* only. Do not add any explanation or prefix.
Format your response as pure JSON only. ONLY return valid JSON. Do not include explanations or extra text.


JD:
${trimmedJD}

Resume:
${resumeText}
`;

  /* ---------- 4. Groq call ---------- */
  const { data } = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are an AI HR assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      maxBodyLength: 25 * 1024 * 1024,
    }
  );

  /* ---------- 5. Extract clean JSON ---------- */
  const rawText = data.choices[0].message.content;
  // If the model still wrapped JSON in ``` fences, unwrap it:
  const match = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const jsonString = (match ? match[1] : rawText).trim();

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("❌ Failed to parse JSON. Raw response:\n", rawText);
    throw new Error("Groq returned non‑JSON output.");
  }
};
export default parseWithGroq;
