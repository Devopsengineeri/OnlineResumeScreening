import interview from "../models/Interview.js";
import sendEmail from "../services/emailService.js";

// Schedule interview
exports.scheduleInterview = async (req, res) => {
  try {
    const { candidate, interviewer, date } = req.body;

    const interview = await interview.create({ candidate, interviewer, date });
    //optional this
    await sendEmail(
      interview,
      "New Interview Scheduled",
      `<p>You have an interview on ${date}</p>`
    );
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: "Failed to schedule interview" });
  }
};

// Update status
exports.updateInterviewStatus = async (req, res) => {
  try {
    const interview = await interview.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// Get all
exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await interview
      .find()
      .populate("candidate")
      .populate("interviewer");

    res.status(201).json(interviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch interviews" });
  }
};
