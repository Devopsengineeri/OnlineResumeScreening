import Candidate from "../models/Candidate.js";
import Interview from "../models/Interview.js";
import sendEmail from "../services/emailService.js";

export const scheduleInterview = async (req, res) => {
  try {
    const { candidate, interviewer, date } = req.body;
    if (!candidate || !interviewer || !date) {
      return res
        .status(400)
        .json({ message: "Candidate, interviewer and date are required" });
    }
    if (new Date(date) < new Date()) {
      return res
        .status(400)
        .json({ message: "Interview date must be in the future" });
    }
    const candidateData = await Candidate.findById(candidate);
    if (!candidateData) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const interview = await Interview.create({ candidate, interviewer, date });

    await Candidate.findByIdAndUpdate(candidate, {
      interview: interview._id,
      interviewStatus: "scheduled", // optional
    });

    // await sendEmail(
    //   candidateData.email,
    //   "Interview Scheduled",
    //   `<h3>Hello ${candidateData.name},</h3>
    //    <p>Your interview is scheduled on <strong>${new Date(
    //      date
    //    ).toLocaleString()}</strong>.</p>
    //    <p>Best of luck!<br/>HR Team</p>`
    // );

    res.status(201).json({
      success: true,
      message: "Interview scheduled and email sent!",
      interview: interview._id,
    });
  } catch (error) {
    console.error("Email Error:", error);
    console.error(
      "❌ Failed to schedule interview:",
      error.response?.data || error.message
    );
  }
};
// Update status
export const updateInterviewStatus = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const newStatus = req.body.status;
    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedInterview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    // Update Candidate status also
    if (updatedInterview.candidate) {
      await Candidate.findByIdAndUpdate(
        updatedInterview.candidate,
        { status: newStatus } // candidate status = interview status
      );
    }
    res.status(200).json(updatedInterview);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};
// Get all
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("candidate", "name email phone")
      .populate("interviewer", "name email");

    res.status(200).json(interviews);
  } catch (error) {
    console.error("❌ Error while fetching interviews:", error);
    res.status(500).json({ message: "Failed to fetch interviews" });
  }
};
// get one interview
export const getOneInterview = async (req, res) => {
  try {
    const oneInterviewFind = await Interview.findById(req.params.id)
      .populate("candidate", "name email phone")
      .populate("interviewer", "name email");
    if (!oneInterviewFind) {
      return res.status(404).json({ message: "Interview not found" });
    }
    res.status(201).json(oneInterviewFind);
  } catch (error) {
    console.error("Interview found Error:", error);
    res.status(500).json({ message: "Interview Not found" });
  }
};
