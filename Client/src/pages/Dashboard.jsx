import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    interview: 0,
  });

  const [statusFilter, setStatusFilter] = useState("shortlisted");
  const [candidates, setCandidates] = useState([]);

  // Fetch Overall Stats (total/shortlisted/interview)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4545/api/candidates/status",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  // Fetch Candidates based on selected status
  useEffect(() => {
    const fetchFilteredCandidates = async () => {
      if (!statusFilter) return;
      console.log("Requesting for status:", statusFilter);
      try {
        const res = await axios.get(
          `http://localhost:4545/api/candidates/status/${statusFilter}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCandidates(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchFilteredCandidates();
  }, [statusFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <Navbar />
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition">
          <h2 className="text-gray-600 text-lg">Total Candidates</h2>
          <p className="text-3xl font-semibold text-blue-700">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition">
          <h2 className="text-gray-600 text-lg">Shortlisted</h2>
          <p className="text-3xl font-semibold text-green-600">
            {stats.shortlisted}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition">
          <h2 className="text-gray-600  text-lg">Interviews</h2>
          <p className="text-3xl font-semibold text-yellow-600">
            {stats.interview}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-8">
        {["shortlisted", "rejected", "interview", "new"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition duration-200 ${
              statusFilter === status
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border hover:bg-blue-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Candidate List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-6 capitalize text-gray-800">
          {statusFilter} Candidates
        </h3>
        {candidates.length === 0 ? (
          <p className="text-gray-500">No candidates found.</p>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 border-b pb-2 is-striped font-semibold text-gray-700 text-sm uppercase">
              <div>Name</div>
              <div className="text-center">Email</div>
              <div className="text-center">Phone</div>
              <div className="text-right">Status</div>
            </div>

            {/* Table Rows */}
            <ul className="divide-y divide-gray-200">
              {candidates.map((c) => (
                <li
                  key={c._id}
                  className="grid grid-cols-4 gap-4 py-3 items-center text-sm hover:bg-gray-50 transition"
                >
                  {/* Name */}
                  <div className="font-black text-xl text-gray-800">
                    {c.name}
                  </div>

                  {/* Email */}
                  <div className="text-center font-black text-xl text-gray-600">
                    {c.email}
                  </div>

                  {/* Phone */}
                  <div className="text-center font-black text-xl text-gray-600">
                    {c.phone}
                  </div>

                  {/* Status */}
                  <div className="text-right ">
                    <span
                      className={`px-3 py-2 text-xs rounded-full capitalize font-semibold
                  ${
                    c.status === "shortlisted"
                      ? "bg-green-100 text-green-700"
                      : c.status === "interview"
                      ? "bg-yellow-100 text-yellow-700"
                      : c.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                  }
                `}
                    >
                      {c.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
