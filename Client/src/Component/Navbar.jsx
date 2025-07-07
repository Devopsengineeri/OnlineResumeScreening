import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("upload");

  const tabs = [
    { name: "Upload", path: "/uploadresume" },
    { name: "Candidates", path: "/candidates" },
  ];

  return (
    <div className="bg-white shadow-md px-6 rounded-2xl py-4 flex justify-between items-center">
      {/* Tabs Section */}
      <div className="flex space-x-8 items-center">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            onClick={() => setActive(tab.name.toLowerCase())}
            className={`relative pb-2 text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200 ${
              active === tab.name.toLowerCase() ? "text-blue-600" : ""
            }`}
          >
            {tab.name}
            {active === tab.name.toLowerCase() && (
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-blue-600 rounded-full transition-all duration-300"></span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Search Bar Section */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />
      </div>
    </div>
  );
};

export default Navbar;
