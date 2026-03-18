const User = require("../models/User");


// SIGNUP
exports.signup = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: "user" // default role
    });

    await newUser.save();

    res.json({
      message: "User created successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};



// LOGIN
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        rewardPoints: user.rewardPoints
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};



// REDEEM POINTS
exports.redeemPoints = async (req, res) => {

  try {

    const { email, cost } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.rewardPoints < cost) {
      return res.status(400).json({
        message: "Not enough points"
      });
    }

    user.rewardPoints -= cost;
    user.redeemedPoints += cost;

    await user.save();

    res.json({
      message: "Reward redeemed successfully",
      rewardPoints: user.rewardPoints
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};