import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "https://mediconnect-87dw.onrender.com/api/auth/signup",
        {
          name: name,
          email: email,
          password: password
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert("Signup failed");

    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="container d-flex justify-content-center align-items-center" style={{minHeight:"70vh"}}>

        <div className="card p-4 shadow" style={{width:"400px"}}>

          <h3 className="text-center mb-4">Create Account</h3>

          <form onSubmit={handleSignup}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Signup
            </button>

          </form>

        </div>

      </div>

    </motion.div>
  );
}

export default Signup;