import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [totalMedicines, setTotalMedicines] = useState(0);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [medicines, setMedicines] = useState([]);

  const fetchDashboard = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      // Fetch dashboard stats
      const response = await axios.get(
        `https://mediconnect-87dw.onrender.com/api/dashboard?email=${user.email}`
      );

      setTotalMedicines(response.data.totalMedicines);
      setRewardPoints(response.data.rewardPoints);

      // Fetch medicine history
      const medicineResponse = await axios.get(
        `https://mediconnect-87dw.onrender.com/api/medicine/user?email=${user.email}`
      );

      setMedicines(medicineResponse.data);

    } catch (error) {
      console.log("Error fetching dashboard data");
    }

  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (

    <div className="container mt-5">

      <h2 className="mb-4">Dashboard</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card text-center shadow p-3">
            <h5>Total Medicines</h5>
            <h3>{totalMedicines}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow p-3">
            <h5>Reward Points</h5>
            <h3>{rewardPoints}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow p-3">
            <h5>Recycling Requests</h5>
            <h3>{totalMedicines}</h3>
          </div>
        </div>

      </div>

      <h3 className="mt-5">Medicine History</h3>

      <table className="table table-bordered mt-3">

        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Medicine Name</th>
            <th>Expiry Date</th>
            <th>Upload Date</th>
          </tr>
        </thead>

        <tbody>

          {medicines.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No medicines uploaded yet
              </td>
            </tr>
          ) : (
            medicines.map((med, index) => (
              <tr key={index}>

                <td>{index + 1}</td>

                <td>
                  {med.image ? (
                    <img
                      src={`https://mediconnect-87dw.onrender.com/uploads/${med.image}`}
                      alt="medicine"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "6px"
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td>{med.medicineName}</td>

                <td>{new Date(med.expiryDate).toLocaleDateString()}</td>

                <td>{new Date(med.createdAt).toLocaleString()}</td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>

  );
}

export default Dashboard;