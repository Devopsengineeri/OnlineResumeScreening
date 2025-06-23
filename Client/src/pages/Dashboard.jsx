import React, { useEffect, useState } from "react";
// import { getCandidateStats, fetchCandidatesByStatus } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    interview: 0,
  });
  const [statusFilter, setStatusFilter] = useState("shortlisted");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getCandidateStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await fetchCandidatesByStatus(statusFilter);
      setCandidates(data);
    };
    fetchCandidates();
  }, [statusFilter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
          <h2>Total Candidates</h2>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
          <h2>Shortlisted</h2>
          <p className="text-2xl">{stats.shortlisted}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-500">
          <h2>Interviews</h2>
          <p className="text-2xl">{stats.interview}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        {["shortlisted", "rejected", "interview", "new"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Candidate List */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-xl font-semibold mb-4 capitalize">
          {statusFilter} Candidates
        </h3>
        {candidates.length === 0 ? (
          <p className="text-gray-500">No candidates found.</p>
        ) : (
          <ul className="space-y-2">
            {candidates.map((c) => (
              <li
                key={c._id}
                className="border-b py-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-gray-600">{c.email}</p>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full capitalize">
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
