import { useState } from "react";
import ResumeViewerModal from "../Component/CandidateDetailsModal";
import InterviewScheduler from "./InterviewScheduler";
import CandidateDetailsModal from "./CandidateDetailsModal";

const CandidateTable = ({ candidates, onStatusChange }) => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <>
      <div className="overflow-x-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Candidate List
        </h2>

        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-2 border">Candidate</th>
              <th className="px-4 py-2 border">Experience</th>
              <th className="px-4 py-2 border">Match Score</th>
              <th className="px-4 py-2 border">Resume</th>
              <th className="px-4 py-2 border">Schedule Interview</th>
            </tr>
          </thead>

          <tbody>
            {candidates?.length > 0 ? (
              candidates.map((candidate) => {
                // ✅ Interview ID is safely calculated once per candidate
                const interviewId =
                  candidate.interview?._id || candidate.interview || null;

                return (
                  <tr
                    key={candidate._id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className="border-t hover:bg-gray-50 transition cursor-pointer"
                  >
                    {/* 👤 Candidate Name + Email */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col text-center leading-snug">
                        <span className="font-semibold text-gray-800 text-sm">
                          {candidate.name}
                        </span>
                        <span className="text-se font-semibold text-gray-500 mt-1">
                          {candidate.email}
                        </span>
                      </div>
                    </td>

                    {/* 🧑‍💼 Experience */}
                    <td className="px-4 py-3 text-center text-gray-700">
                      {candidate.experience || "N/A"} year(s)
                    </td>

                    {/* 📊 Match Score */}
                    <td className="px-4 py-3 text-center">
                      {candidate.matchScore ? (
                        <span
                          className={`px-2 py-1 rounded-full text-white text-center font-semibold ${
                            candidate.matchScore.skillsScore >= 80
                              ? "bg-green-600"
                              : candidate.matchScore.skillsScore >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {candidate.matchScore.skillsScore}%
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">N/A</span>
                      )}
                    </td>

                    {/* 📄 Resume Button */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedResume(candidate.resumeUrl);
                        }}
                        className="text-blue-600 underline text-xs hover:text-blue-800"
                      >
                        View Resume
                      </button>
                    </td>

                    {/* 📅 Interview Scheduler */}
                    <td className="px-1 py-2">
                      <div onClick={(e) => e.stopPropagation()}>
                        <InterviewScheduler
                          candidateId={candidate._id}
                          interviewId={interviewId}
                          onSchedule={() =>
                            console.log(
                              "Interview scheduled with ID: ",
                              interviewId
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Resume Viewer Modal */}
      <ResumeViewerModal
        resumeUrl={selectedResume}
        onClose={() => setSelectedResume(null)}
      />

      {/* 📋 Candidate Details Modal */}
      <CandidateDetailsModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </>
  );
};

export default CandidateTable;
