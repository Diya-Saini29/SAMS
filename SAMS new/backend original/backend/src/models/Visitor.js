const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    personToVisit: {
      type: String,
      required: true,
      trim: true,
    },

    passId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    passValidFrom: {
      type: Date,
      required: true,
    },

    passValidUntil: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Registered", "Active", "Expired", "Cancelled"],
      default: "Registered",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Visitor", visitorSchema);