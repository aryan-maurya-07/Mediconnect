import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrackMedicines from "./pages/TrackMedicines";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import TrackingPage from "./pages/TrackingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadMedicine from "./pages/UploadMedicine";
import Rewards from "./pages/Rewards";
import ManagerDashboard from "./pages/ManagerDashboard";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <div className="app-container">

        <Navbar />

        <div className="content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadMedicine />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/rewards"
              element={
                <ProtectedRoute>
                  <Rewards />
                </ProtectedRoute>
              }
            />
            <Route path="/track" element={<TrackMedicines />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          </Routes>

        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;