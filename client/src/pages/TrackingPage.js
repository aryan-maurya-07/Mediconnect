import React from "react";
import { useLocation } from "react-router-dom";

function TrackingPage() {

  const location = useLocation();
  const medicine = location.state?.medicine;

  if (!medicine) {
    return <h3 className="text-center mt-5">No tracking data</h3>;
  }

  const steps = [
  { name: "Requested", date: medicine.timeline?.requested },
  { name: "Pickup Scheduled", date: medicine.timeline?.pickupScheduled },
  { name: "Picked Up", date: medicine.timeline?.pickedUp },
  { name: "In Transit", date: medicine.timeline?.inTransit },
  { name: "Received at Facility", date: medicine.timeline?.receivedAtFacility },
  { name: "Inspection in Progress", date: medicine.timeline?.inspectionInProgress },
  { name: "Recycling in Progress", date: medicine.timeline?.recyclingInProgress },
  { name: "Recycling Completed", date: medicine.timeline?.recyclingCompleted },
  { name: "Points Awarded", date: medicine.timeline?.pointsAwarded }
];

  const stepNames = steps.map(step => step.name);
  const currentStep = stepNames.indexOf(medicine.status);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (

    <div className="container mt-5">

      <h2>Medicine Tracking</h2>

      <h4 className="mt-3">{medicine.medicineName}</h4>

      {/* Current Status */}

      <div className="card p-3 shadow mb-4 mt-3">
        <h5>Current Status</h5>
        <h4 className="text-success">{medicine.status}</h4>
      </div>

      {/* Progress Bar */}

      <h5>Recycling Progress</h5>

      <div className="progress mb-4" style={{ height: "25px" }}>

        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
        >
          {Math.round(progress)}%
        </div>

      </div>
      {medicine.status === "Points Awarded" && (
  <div className="alert alert-success mt-3">
    🎉 Recycling completed! You earned 50 reward points.
  </div>
)}

      {/* Journey Timeline */}

      <h5>Recycling Journey</h5>

      <div className="mt-4">

        {steps.map((step, index) => {

          let icon = "⚪";
let color = "secondary";

if (medicine.status === "Points Awarded") {

  // all steps completed
  icon = "✔";
  color = "success";

}
else if (index < currentStep) {

  icon = "✔";
  color = "success";

}
else if (index === currentStep) {

  icon = "🟡";
  color = "warning";

}

// highlight final reward step
if (step.name === "Points Awarded" && medicine.status === "Points Awarded") {
  color = "success";
  icon = "🎉";
}

          return (

            <div key={index} className="d-flex align-items-start mb-3">

              <div
                className={`rounded-circle bg-${color} text-white d-flex justify-content-center align-items-center`}
                style={{
                  width: "35px",
                  height: "35px",
                  marginRight: "15px"
                }}
              >
                {icon}
              </div>

              <div>

                <h6 className="mb-1">{step.name}</h6>

                {step.date && (
                  <small className="text-muted">
                    {new Date(step.date).toLocaleDateString()}
                  </small>
                )}

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default TrackingPage;