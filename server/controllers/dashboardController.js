const User = require("../models/User");

exports.getDashboard = async (req, res) => {

  try {

    const { email } = req.query;

    const user = await User.findOne({ email });

    res.json({
      totalMedicines: user.totalMedicines,
      rewardPoints: user.rewardPoints
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};