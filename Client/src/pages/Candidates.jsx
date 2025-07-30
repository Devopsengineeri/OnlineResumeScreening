import { useEffect, useState } from "react";
import axios from "axios";
import CandidateTable from "../Component/CandidateTable";
import FilterPanel from "../Component/FilterPanel";
import Navbar from "../Component/Navbar";

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
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates:", err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4545/api/candidates/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCandidates();
    } catch (err) {
      console.error("Error deleting candidate:", err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
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
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
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
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">All Candidates</h1>

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
