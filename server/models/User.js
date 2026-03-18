const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user","manager"],
    default: "user"
  },

  rewardPoints: {
    type: Number,
    default: 0
  },

  redeemedPoints: {
  type: Number,
  default: 0
},

  totalMedicines: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("User", UserSchema);