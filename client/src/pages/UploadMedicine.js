import React, { useState } from "react";
import axios from "axios";

function UploadMedicine() {

  const [medicineName, setMedicineName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const formData = new FormData();
      formData.append("userEmail", user.email);
      formData.append("medicineName", medicineName);
      formData.append("expiryDate", expiryDate);
      formData.append("image", image);

      const response = await axios.post(
        "https://mediconnect-87dw.onrender.com/api/medicine/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(response.data.message);

      setMedicineName("");
      setExpiryDate("");
      setImage(null);

      // Redirect to dashboard after upload
      window.location.href = "/dashboard";

    } catch (error) {

      console.error(error);
      alert("Upload failed");

    }
  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4">Upload Medicine</h2>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Medicine Name</label>
          <input
            type="text"
            className="form-control"
            value={medicineName}
            onChange={(e)=>setMedicineName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            className="form-control"
            value={expiryDate}
            onChange={(e)=>setExpiryDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e)=>setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit Medicine
        </button>

      </form>

    </div>

  );
}

export default UploadMedicine;