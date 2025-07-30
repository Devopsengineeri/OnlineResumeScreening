import React, { useState } from "react";
import axios from "axios";

const ResumeUploadForm = () => {
  const [resume, setResume] = useState(null);
  const [requiredSkills, setRequiredSkills] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [matchScore, setMatchScore] = useState(null);
  console.log(matchScore, "matchScore");
  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };
  const handleSkillsChange = (e) => {
    setRequiredSkills(e.target.value); // comma-separated string
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !requiredSkills) {
      setError("Resume and Required Skills are required.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", resume);

    // Convert comma-separated string to array
    const skillsArray = requiredSkills
      .split(",")
      .map((skill) => skill.trim().toLowerCase());

    formData.append("requiredSkills", JSON.stringify(skillsArray)); // 👈 expected by backend

    try {
      const res = await axios.post(
        "http://localhost:4545/api/candidates",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Resume uploaded successfully!");
      setMatchScore(res.data.matchScore); // 👈 Show this
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to upload resume.");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleResumeChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Enter required skills (comma-separated)"
        value={requiredSkills}
        onChange={handleSkillsChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Resume
      </button>

      {error && (
        <p className="text-red-600 text-sm text-center mt-2">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm text-center mt-2">{success}</p>
      )}

      {matchScore && (
        <div className="mt-4">
          <h4 className="font-semibold text-sm">Matched Skills:</h4>
          <p className="text-gray-800 text-sm">
            {console.log(matchScore, "matchScore")}
            {matchScore.matchedSkills.join(", ")}
          </p>
          <p className="mt-1 font-medium text-sm">
            <span
              className={`px-2 py-1 rounded-full text-white ${
                matchScore.skillsScore >= 80
                  ? "bg-green-600"
                  : matchScore.skillsScore >= 50
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}
            >
              {matchScore.skillsScore}%
            </span>
          </p>
        </div>
      )}
    </form>
  );
};

export default ResumeUploadForm;
