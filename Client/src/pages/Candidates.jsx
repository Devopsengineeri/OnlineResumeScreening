import { useEffect, useState } from "react";
import axios from "axios";
import CandidateTable from "../Component/CandidateTable";
import FilterPanel from "../Component/FilterPanel";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:4545/api/candidates", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCandidates(res.data.data);
    } catch (err) {
      console.error("Error fetching candidates:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      await axios.delete(`http://localhost:4545/api/candidates/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCandidates();
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.patch(
      `http://localhost:4545/api/candidates/${id}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchCandidates();
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const filteredCandidates =
    statusFilter === "all"
      ? candidates
      : candidates.filter((c) => c.status === statusFilter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Candidates</h1>

      {/* 👇 Now using FilterPanel component */}
      <FilterPanel
        selectedStatus={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <CandidateTable
        candidates={filteredCandidates}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Candidates;
