// import Login from "./auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./auth/PrivateRoute";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
