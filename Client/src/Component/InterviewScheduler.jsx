import { useState } from "react";
import axios from "axios";

const InterviewScheduler = ({ candidateId, interviewId, onSchedule }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const token = localStorage.getItem("token");
  const interviewerId = localStorage.getItem("userId");

  const handleSchedule = async () => {
    if (!date || !time) {
      alert("Date & Time required!");
      return;
    }

    const datetime = `${date}T${time}`;

    try {
      const res = await axios.post(
        "http://localhost:4545/api/interview",
        {
          candidate: candidateId,
          interviewer: interviewerId,
          date: datetime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res, "res");
      // const interviewId = res.data.interview._id;
      alert("Interview scheduled!");
      // onSchedule?.(); // Refresh parent
    } catch (err) {
      console.error("Schedule Error:", err.response?.data || err.message);
      alert("Failed to schedule interview.");
    }
  };

  const handleStatus = async () => {
    if (!interviewId) {
      alert("Interview ID missing!");
      return;
    }
    // console.log(interviewId, "aaaaaaa");
    try {
      await axios.patch(
        `http://localhost:4545/api/interview/${interviewId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Sending status:", newStatus);
      alert("Interview status updated!");
      onSchedule?.();
    } catch (error) {
      console.error(
        "Status Update Error:",
        error.response?.data || error.message
      );
      alert("Failed to update interview status.");
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm w-full bg-gray-50 space-y-4">
      {/* Schedule Interview Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">
          📅 Schedule Interview
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-3 py-1.5 rounded-md w-full sm:w-auto"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border px-3 py-1.5 rounded-md w-full sm:w-auto"
          />
          <button
            onClick={handleSchedule}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 text-sm"
          >
            Schedule
          </button>
        </div>
      </div>

      <hr className="border-t" />

      {/* Update Status Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">🔄 Update Status</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border px-3 py-1.5 rounded-md w-full sm:w-auto"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="cancelled">Cancelled</option>
            {/* ✅ Optional but useful */}
          </select>
          <button
            onClick={handleStatus}
            className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 text-sm"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
