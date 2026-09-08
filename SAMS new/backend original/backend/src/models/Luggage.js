const mongoose = require("mongoose");

const luggageSchema = new mongoose.Schema(
  {
    luggageTag: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    passengerName: {
      type: String,
      required: true,
      trim: true,
    },

    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "checked-in",
        "in-transit",
        "arrived",
        "claimed",
        "lost",
      ],
      default: "checked-in",
    },

    location: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Luggage", luggageSchema);