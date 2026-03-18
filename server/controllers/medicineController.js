const Medicine = require("../models/Medicine");
const User = require("../models/User");


// Upload Medicine
exports.uploadMedicine = async (req, res) => {

  try {

    const { userEmail, medicineName, expiryDate } = req.body;

    const medicine = new Medicine({
      userEmail,
      medicineName,
      expiryDate,
      image: req.file ? req.file.filename : "",
      status: "Requested",
      timeline: {
        requested: new Date()
      }
    });

    await medicine.save();

    // update user medicine count only
    await User.findOneAndUpdate(
      { email: userEmail },
      {
        $inc: {
          totalMedicines: 1
        }
      }
    );

    res.json({
      message: "Medicine uploaded successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// Get medicines for dashboard / tracking
exports.getMedicines = async (req, res) => {

  try {

    const { email } = req.query;

    const medicines = await Medicine.find({ userEmail: email });

    res.json(medicines);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// Update Status (Manager)
exports.updateStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    const steps = [
      "Requested",
      "Pickup Scheduled",
      "Picked Up",
      "In Transit",
      "Received at Facility",
      "Inspection in Progress",
      "Recycling in Progress",
      "Recycling Completed",
      "Points Awarded"
    ];

    const timelineKeys = [
      "requested",
      "pickupScheduled",
      "pickedUp",
      "inTransit",
      "receivedAtFacility",
      "inspectionInProgress",
      "recyclingInProgress",
      "recyclingCompleted",
      "pointsAwarded"
    ];

    const currentIndex = steps.indexOf(medicine.status);

    if (currentIndex < steps.length - 1) {

      const nextStatus = steps[currentIndex + 1];
      const timelineKey = timelineKeys[currentIndex + 1];

      medicine.status = nextStatus;

      if (!medicine.timeline) {
        medicine.timeline = {};
      }

      medicine.timeline[timelineKey] = new Date();

      await medicine.save();

      // ⭐ Give reward when recycling is fully completed
      if (nextStatus === "Points Awarded") {

        await User.findOneAndUpdate(
          { email: medicine.userEmail },
          { $inc: { rewardPoints: 50 } }
        );

      }

    }

    res.json({
      message: "Status updated",
      status: medicine.status
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// Manager: Get all medicines
exports.getAllMedicines = async (req, res) => {

  try {

    const medicines = await Medicine.find();

    res.json(medicines);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

//Analytics API
// Analytics API
exports.getAnalytics = async (req, res) => {

  try {

    const totalMedicines = await Medicine.countDocuments();

    const recycledMedicines = await Medicine.countDocuments({
      status: "Points Awarded"
    });

    const totalUsers = await User.countDocuments();

    const users = await User.find();

    let totalPoints = 0;
    let redeemedPoints = 0;

    users.forEach(user => {
      totalPoints += user.rewardPoints || 0;
      redeemedPoints += user.redeemedPoints || 0;
    });


    /* ===== LIVE SYSTEM MONITORING ===== */

    const activeRequests = await Medicine.countDocuments({
      status: "Requested"
    });

    const inTransit = await Medicine.countDocuments({
      status: "In Transit"
    });

    const processing = await Medicine.countDocuments({
      status: { 
        $in: ["Inspection in Progress", "Recycling in Progress"]
      }
    });

    const completed = await Medicine.countDocuments({
      status: "Points Awarded"
    });


    /* ===== RECENT ACTIVITY ===== */

    const recentActivity = await Medicine.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("medicineName status");


    res.json({
      totalMedicines,
      recycledMedicines,
      totalUsers,
      totalPoints,
      redeemedPoints,
      activeRequests,
      inTransit,
      processing,
      completed,
      recentActivity
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};