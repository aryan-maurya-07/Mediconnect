import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-success">

      <div className="container">

        <Link className="navbar-brand" to="/">
          Mediconnect
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">Home</Link>

          {!user && (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/signup">Signup</Link>
            </>
          )}

          {user && user.role === "user" && (
            <>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
              <Link className="nav-link" to="/upload">Upload Medicine</Link>
              <Link className="nav-link" to="/rewards">Rewards</Link>
              <Link className="nav-link" to="/track">Track</Link>

              <button
                className="btn btn-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {user && user.role === "manager" && (
            <>
              <Link className="nav-link" to="/manager">Manager Dashboard</Link>
              <Link className="nav-link" to="/analytics">Charts</Link>
              <button
                className="btn btn-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;