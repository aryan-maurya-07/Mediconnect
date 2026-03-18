import React, { useEffect, useState } from "react";
import axios from "axios";

import { Bar, Doughnut } from "react-chartjs-2";

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 ArcElement,
 Tooltip,
 Legend
} from "chart.js";

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 ArcElement,
 Tooltip,
 Legend
);

function Analytics(){

 const [analytics,setAnalytics] = useState({});

 const fetchAnalytics = async()=>{

   try{

    const response = await axios.get(
      "https://mediconnect-87dw.onrender.com/api/medicine/analytics"
    );

    setAnalytics(response.data);

   }catch(error){
    console.log("Analytics fetch error");
   }

 };

 useEffect(()=>{
   fetchAnalytics();
 },[]);


 // Environmental calculations

 const wastePrevented = (analytics.recycledMedicines || 0) * 0.5;

 const ecoScore = analytics.totalMedicines
  ? Math.round(
      (analytics.recycledMedicines / analytics.totalMedicines) * 100
    )
  : 0;


 // Bar Chart

 const barData = {
  labels:["Uploaded","Recycled"],
  datasets:[
   {
    label:"Medicines",
    data:[
     analytics.totalMedicines || 0,
     analytics.recycledMedicines || 0
    ],
    backgroundColor:["#0d6efd","#198754"]
   }
  ]
 };


 // Doughnut Chart

 const doughnutData = {
  labels:["Earned Points","Redeemed Points"],
  datasets:[
   {
    data:[
     analytics.totalPoints || 0,
     analytics.redeemedPoints || 0
    ],
    backgroundColor:["#198754","#dc3545"]
   }
  ]
 };


 return(

  <div className="container mt-5">

   <h2 className="mb-4">Analytics Dashboard</h2>


   {/* Environmental Impact */}

   <div className="row mb-4">

    <div className="col-md-4">
     <div className="card text-center shadow p-3">
      <h6>♻ Medicines Recycled</h6>
      <h3>{analytics.recycledMedicines || 0}</h3>
     </div>
    </div>

    <div className="col-md-4">
     <div className="card text-center shadow p-3">
      <h6>🗑 Waste Prevented</h6>
      <h3>{wastePrevented} kg</h3>
     </div>
    </div>

    <div className="col-md-4">
     <div className="card text-center shadow p-3">
      <h6>🌱 Environmental Score</h6>
      <h3>{ecoScore}%</h3>
     </div>
    </div>

   </div>

   <div className="row mb-4">

 <div className="col-md-3">
  <div className="card text-center shadow p-3">
   <h6>🟢 Active Requests</h6>
   <h3>{analytics.activeRequests || 0}</h3>
  </div>
 </div>

 <div className="col-md-3">
  <div className="card text-center shadow p-3">
   <h6>🚚 In Transit</h6>
   <h3>{analytics.inTransit || 0}</h3>
  </div>
 </div>

 <div className="col-md-3">
  <div className="card text-center shadow p-3">
   <h6>🏭 Processing</h6>
   <h3>{analytics.processing || 0}</h3>
  </div>
 </div>

 <div className="col-md-3">
  <div className="card text-center shadow p-3">
   <h6>✅ Completed</h6>
   <h3>{analytics.completed || 0}</h3>
  </div>
 </div>

</div>


   {/* Summary Cards */}

   <div className="row mb-4">

    <div className="col-md-3">
     <div className="card text-center shadow p-3">
      <h6>💊 Total Medicines</h6>
      <h3>{analytics.totalMedicines || 0}</h3>
     </div>
    </div>

    <div className="col-md-3">
     <div className="card text-center shadow p-3">
      <h6>♻ Recycled Medicines</h6>
      <h3>{analytics.recycledMedicines || 0}</h3>
     </div>
    </div>

    <div className="col-md-3">
     <div className="card text-center shadow p-3">
      <h6>👥 Total Users</h6>
      <h3>{analytics.totalUsers || 0}</h3>
     </div>
    </div>

    <div className="col-md-3">
     <div className="card text-center shadow p-3">
      <h6>🎁 Total Reward Points</h6>
      <h3>{analytics.totalPoints || 0}</h3>
     </div>
    </div>

   </div>


   {/* Charts */}

   <div className="row">

    <div className="col-md-6">
     <div className="card p-3 shadow">
      <h5 className="text-center">
       Medicine Recycling Overview
      </h5>
      <Bar data={barData}/>
     </div>
    </div>

    <div className="col-md-6">
     <div className="card p-3 shadow">
      <h5 className="text-center">
       Reward Points Distribution
      </h5>

      <div style={{width:"300px", margin:"auto"}}>
        <Doughnut data={doughnutData}/>
      </div>

     </div>
    </div>

   </div>


   {/* Recent Activity */}

   <div className="row mt-5">

    <div className="col-md-12">

     <div className="card shadow p-3">

      <h5 className="mb-3">Recent Recycling Activity</h5>

      <ul className="list-group">

       {analytics.recentActivity?.length > 0 ? (

        analytics.recentActivity.map((item,index)=>(
         
         <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
         >

          <span>💊 {item.medicineName}</span>

          <span className="badge bg-success">
            {item.status}
          </span>

         </li>

        ))

       ) : (

        <li className="list-group-item text-center">
         No activity yet
        </li>

       )}

      </ul>

     </div>

    </div>

   </div>


  </div>

 );

}

export default Analytics;