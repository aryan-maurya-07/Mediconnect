const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({

  userEmail: {
    type: String,
    required: true
  },

  medicineName: {
    type: String,
    required: true
  },

  expiryDate: {
    type: Date,
    required: true
  },

  image: {
    type: String
  },

  status: {
    type: String,
    default: "Requested"
  },

  timeline: {
    requested: {
      type: Date
    },
    pickupScheduled: {
      type: Date
    },
    pickedUp: {
      type: Date
    },
    inTransit: {
      type: Date
    },
    receivedAtFacility: {
      type: Date
    },
    inspectionInProgress: {
      type: Date
    },
    recyclingInProgress: {
      type: Date
    },
    recyclingCompleted: {
      type: Date
    },
    pointsAwarded: {
      type: Date
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Medicine", MedicineSchema);