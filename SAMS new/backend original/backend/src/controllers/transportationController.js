const Transportation = require("../models/Transportation");

// Create transportation
const createTransportation = async (req, res) => {
  try {
    const transportation = await Transportation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Transportation scheduled successfully",
      data: transportation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all transportation records
const getTransportation = async (req, res) => {
  try {
    const transportation = await Transportation.find()
      .populate(
        "flight",
        "flightNumber airline origin destination departureTime arrivalTime"
      )
      .sort({ scheduledTime: 1 });

    res.status(200).json({
      success: true,
      count: transportation.length,
      data: transportation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one transportation record
const getTransportationById = async (req, res) => {
  try {
    const transportation = await Transportation.findById(
      req.params.id
    ).populate(
      "flight",
      "flightNumber airline origin destination departureTime arrivalTime"
    );

    if (!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: transportation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update transportation
const updateTransportation = async (req, res) => {
  try {
    const transportation = await Transportation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "flight",
      "flightNumber airline origin destination departureTime arrivalTime"
    );

    if (!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transportation updated successfully",
      data: transportation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete transportation
const deleteTransportation = async (req, res) => {
  try {
    const transportation = await Transportation.findByIdAndDelete(
      req.params.id
    );

    if (!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transportation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTransportation,
  getTransportation,
  getTransportationById,
  updateTransportation,
  deleteTransportation,
};