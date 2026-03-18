import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://mediconnect-87dw.onrender.com/api/auth/login",
        {
          email: email,
          password: password
        }
      );

      const user = response.data.user;

localStorage.setItem("user", JSON.stringify(user));

if(user.role === "manager"){
  window.location.href = "/manager";
}else{
  window.location.href = "/dashboard";
}

    } catch (error) {

      alert("Login failed");

    }

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>

        <div className="card p-4 shadow" style={{ width: "400px" }}>

          <h3 className="text-center mb-4">Login</h3>

          <form onSubmit={handleLogin}>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Login
            </button>

          </form>

        </div>

      </div>

    </motion.div>
  );
}

export default Login;