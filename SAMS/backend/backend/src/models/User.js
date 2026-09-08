const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: [
        "admin",
        "staff",
        "airline_staff",
        "passenger",
        "visitor",
        "transport_operator",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);