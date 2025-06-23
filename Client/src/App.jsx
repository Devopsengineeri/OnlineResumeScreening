import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";

import UploadResume from "./pages/UploadResume";

import PrivateRoute from "./auth/PrivateRoute";
import Candidates from "./pages/Candidates";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/uploadresume"
          element={
            <PrivateRoute>
              <UploadResume />
            </PrivateRoute>
          }
        />
        <Route
          path="/candidates"
          element={
            <PrivateRoute>
              <Candidates />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
