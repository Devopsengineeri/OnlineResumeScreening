import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formDate, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormDate({ ...formDate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4545/api/auth/register`,
        formDate
      );
      if (response.data) {
        alert("User Registered Successfully ✅");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-blue-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formDate.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            value={formDate.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formDate.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            name="role"
            value={formDate.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-xl"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
