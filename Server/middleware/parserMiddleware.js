import parseResume from "../services/resumeParser.js";

export const parseResumeMiddleware = async (req, res, next) => {
  try {
    console.log(req.file, "qwwqwwq");
    if (!req.file?.path) {
      return next();
    }
    const parse = await parseResume(req.file.path);
    req.parseResume = parse;
  } catch (error) {
    res.status(500).json({ message: "Resume parsing failed" });
  }
};
