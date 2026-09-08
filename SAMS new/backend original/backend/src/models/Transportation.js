const mongoose = require("mongoose");

const transportationSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      enum: ["Cab", "Shuttle"],
      required: true,
    },

    driverName: {
      type: String,
      required: true,
      trim: true,
    },

    route: {
      type: String,
      required: true,
      trim: true,
    },

    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },

    scheduledTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Scheduled", "In Transit", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Transportation",
  transportationSchema
);