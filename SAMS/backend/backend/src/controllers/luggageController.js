const Luggage = require("../models/Luggage");

// Create luggage
const createLuggage = async (req, res) => {
  try {
    const luggage = await Luggage.create(req.body);

    res.status(201).json({
      success: true,
      message: "Luggage created successfully",
      data: luggage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all luggage
const getLuggage = async (req, res) => {
  try {
    const luggage = await Luggage.find().populate(
      "flight",
      "flightNumber airline origin destination"
    );

    res.status(200).json({
      success: true,
      count: luggage.length,
      data: luggage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get luggage by ID
const getLuggageById = async (req, res) => {
  try {
    const luggage = await Luggage.findById(req.params.id).populate(
      "flight",
      "flightNumber airline origin destination"
    );

    if (!luggage) {
      return res.status(404).json({
        success: false,
        message: "Luggage not found",
      });
    }

    res.status(200).json({
      success: true,
      data: luggage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update luggage
const updateLuggage = async (req, res) => {
  try {
    const luggage = await Luggage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!luggage) {
      return res.status(404).json({
        success: false,
        message: "Luggage not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Luggage updated successfully",
      data: luggage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete luggage
const deleteLuggage = async (req, res) => {
  try {
    const luggage = await Luggage.findByIdAndDelete(req.params.id);

    if (!luggage) {
      return res.status(404).json({
        success: false,
        message: "Luggage not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Luggage deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLuggage,
  getLuggage,
  getLuggageById,
  updateLuggage,
  deleteLuggage,
};