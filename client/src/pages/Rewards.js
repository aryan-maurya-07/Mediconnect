import React, { useEffect, useState } from "react";
import axios from "axios";

function Rewards() {

  const [points, setPoints] = useState(0);

  const loadPoints = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const response = await axios.get(
        `https://mediconnect-87dw.onrender.com/api/dashboard?email=${user.email}`
      );

      setPoints(response.data.rewardPoints);
    } catch (error) {
      console.log("Error loading points");
    }
  };

  useEffect(() => {
    loadPoints();
  }, []);

  const redeemReward = async (cost, rewardName) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (points < cost) {
      alert("Not enough reward points!");
      return;
    }

    try {

      const response = await axios.post(
        "https://mediconnect-87dw.onrender.com/api/auth/redeem",
        {
          email: user.email,
          cost: cost
        }
      );

      alert(`You redeemed: ${rewardName}`);

      setPoints(response.data.rewardPoints);

    } catch (error) {

      alert("Redeem failed");

    }

  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4">Rewards</h2>

      <div className="card p-4 shadow text-center mb-4">

        <h4>Your Total Points</h4>
        <h2 className="text-success">{points}</h2>

        <p className="text-muted">
          Earn 10 points for each medicine you recycle.
        </p>

      </div>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow p-3 text-center">

            <h5>Discount Coupon</h5>
            <p>Redeem for pharmacy discount</p>

            <button
              className="btn btn-success"
              onClick={() => redeemReward(10, "Discount Coupon")}
            >
              Redeem 10 Points
            </button>

          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3 text-center">

            <h5>Free Health Check</h5>
            <p>Basic health consultation</p>

            <button
              className="btn btn-success"
              onClick={() => redeemReward(50, "Free Health Check")}
            >
              Redeem 50 Points
            </button>

          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3 text-center">

            <h5>Pharmacy Voucher</h5>
            <p>₹200 medicine voucher</p>

            <button
              className="btn btn-success"
              onClick={() => redeemReward(100, "Pharmacy Voucher")}
            >
              Redeem 100 Points
            </button>

          </div>
        </div>

      </div>

    </div>

  );
}

export default Rewards;