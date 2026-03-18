import React from "react";
import { Link } from "react-router-dom";
import { FaRecycle, FaGift, FaLeaf } from "react-icons/fa";

function Home() {
  return (

    <div className="container mt-5">

      <div className="text-center">

        <h1>Welcome to Mediconnect</h1>

        <p className="lead">
          Recycle unused medicines safely and earn reward points.
        </p>

        <Link to="/upload" className="btn btn-success m-2">
          Recycle Medicine
        </Link>

        <Link to="/rewards" className="btn btn-outline-success m-2">
          View Rewards
        </Link>

      </div>

      <div className="mt-5">

        <h2>How It Works</h2>

        <div className="row mt-5">

  <div className="col-md-4">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5>Recycle Medicines</h5>
        <p>Upload unused medicines and help reduce medical waste.</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5>Earn Rewards</h5>
        <p>Earn reward points when you recycle medicines.</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5>Sustainable Healthcare</h5>
        <p>Help build a greener and healthier future.</p>
      </div>
    </div>
  </div>

</div>

        <ul className="list-group">

          <li className="list-group-item">
            Upload unused medicine details
          </li>

          <li className="list-group-item">
            Drop medicine at nearest collection center
          </li>

          <li className="list-group-item">
            Earn reward points
          </li>

          <li className="list-group-item">
            Redeem rewards
          </li>

        </ul>

      </div>

    </div>

  );
}

export default Home;