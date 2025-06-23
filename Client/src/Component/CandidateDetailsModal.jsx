import React from "react";

const CandidateDetailsModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Candidate Details
        </h2>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Name:</strong> {candidate.name}
          </p>
          <p>
            <strong>Email:</strong> {candidate.email}
          </p>
          <p>
            <strong>Phone:</strong> {candidate.phone || "N/A"}
          </p>
          <p>
            <strong>Experience:</strong> {candidate.experience || "N/A"} year(s)
          </p>
          <p>
            <strong>Skills:</strong> {candidate.skills?.join(", ") || "N/A"}
          </p>

          {candidate.matchScore && (
            <>
              <p>
                <strong>Match Score:</strong> {candidate.matchScore.skillsScore}
                %
              </p>
              <p>
                <strong>Experience Score:</strong>{" "}
                {candidate.matchScore.experienceScore || 0}%
              </p>
            </>
          )}

          <p>
            <strong>Resume:</strong>{" "}
            <a
              href={candidate.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </p>

          <p>
            <strong>Status:</strong> {candidate.status || "new"}
          </p>
          {candidate.interviewDate && (
            <p>
              <strong>Interview:</strong>{" "}
              {new Date(candidate.interviewDate).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;
