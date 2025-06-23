import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4545/api/auth/login`, {
        email,
        password,
      });
      console.log(res.data, " 13314");
      const { token, role, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", user);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-[8px_8px_20px_rgba(0,0,0,0.1),_-4px_-4px_12px_rgba(255,255,255,0.6)] border border-gray-200 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow-sm">
          Login to Continue
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-gray-700">
              Password
            </label>

            <input
              type="text"
              placeholder="Enter your password"
              value={password}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </form>
        <p className="mt-6 text-sm text-red-600 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 underline hover:text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
