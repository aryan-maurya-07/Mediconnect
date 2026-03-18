import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TrackMedicines() {

  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  const fetchMedicines = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `http://localhost:5000/api/medicine/user?email=${user.email}`
      );

      setMedicines(response.data);

    } catch (error) {
      console.log("Error loading medicines");
    }

  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const openTracking = (medicine) => {
    navigate("/tracking", { state: { medicine } });
  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4">Track Medicines</h2>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>#</th>
            <th>Medicine</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {medicines.map((med, index) => (

            <tr key={index}>

              <td>{index + 1}</td>

              <td>{med.medicineName}</td>

              <td>
                <span className="badge bg-warning text-dark">
                  {med.status || "Requested"}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openTracking(med)}
                >
                  Track
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default TrackMedicines;