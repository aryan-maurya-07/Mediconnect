import React, { useEffect, useState } from "react";
import axios from "axios";

function ManagerDashboard(){

 const [medicines,setMedicines] = useState([]);
 const [analytics,setAnalytics] = useState({});

 const fetchMedicines = async()=>{

   const response = await axios.get(
     "https://mediconnect-87dw.onrender.com/api/medicine/all"
   );

   setMedicines(response.data);

 };

 const fetchAnalytics = async()=>{

   const response = await axios.get(
     "https://mediconnect-87dw.onrender.com/api/medicine/analytics"
   );

   setAnalytics(response.data);

 };

 useEffect(()=>{
   fetchMedicines();
   fetchAnalytics();
 },[]);


 const updateStatus = async(id)=>{

   await axios.put(
     `https://mediconnect-87dw.onrender.com/api/medicine/update-status/${id}`
   );

   fetchMedicines();
   fetchAnalytics();

 };


 return(

  <div className="container mt-5">

   <h2 className="mb-4">Manager Dashboard</h2>


   {/* Analytics Cards */}

   <div className="row mb-4">

    <div className="col-md-3">
     <div className="card p-3 shadow text-center">
      <h6>Total Users</h6>
      <h3>{analytics.totalUsers || 0}</h3>
     </div>
    </div>

    <div className="col-md-3">
     <div className="card p-3 shadow text-center">
      <h6>Medicines Uploaded</h6>
      <h3>{analytics.totalMedicines || 0}</h3>
     </div>
    </div>

    <div className="col-md-3">
     <div className="card p-3 shadow text-center">
      <h6>Recycled</h6>
      <h3>{analytics.recycledMedicines || 0}</h3>
     </div>
    </div>

    <div className="col-md-3">
     <div className="card p-3 shadow text-center">
      <h6>Total Points Given</h6>
      <h3>{analytics.totalPoints || 0}</h3>
     </div>
    </div>

   </div>


   {/* Medicines Table */}

   <table className="table table-bordered mt-4">

    <thead>
     <tr>
      <th>#</th>
      <th>Medicine</th>
      <th>User</th>
      <th>Status</th>
      <th>Action</th>
     </tr>
    </thead>

    <tbody>

     {medicines.map((med,index)=>(
      <tr key={index}>

       <td>{index+1}</td>
       <td>{med.medicineName}</td>
       <td>{med.userEmail}</td>
       <td>{med.status}</td>

       <td>

        {med.status !== "Points Awarded" ? (
         <button
          className="btn btn-primary"
          onClick={()=>updateStatus(med._id)}
         >
          Next Step
         </button>
        ) : (
         <span className="badge bg-success">Completed</span>
        )}

       </td>

      </tr>
     ))}

    </tbody>

   </table>

  </div>

 );

}

export default ManagerDashboard;