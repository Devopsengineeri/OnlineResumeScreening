import React from "react";

const FilterPanel = ({ selectedStatus, onStatusChange }) => {
  const statuses = ["all", "shortlisted", "interview", "rejected"];

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`px-3 py-1 rounded text-sm capitalize ${
            selectedStatus === status
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
