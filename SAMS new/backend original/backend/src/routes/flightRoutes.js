const express = require("express");

const {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
} = require("../controllers/flightController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create a flight
router.post(
  "/",
  protect,
  authorizeRoles("admin", "airline_staff"),
  createFlight
);

// Get all flights
router.get(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "staff",
    "airline_staff",
    "passenger",
    "visitor"
  ),
  getFlights
);

// Get one flight
router.get(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "staff",
    "airline_staff",
    "passenger",
    "visitor"
  ),
  getFlightById
);

// Update a flight
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "airline_staff"),
  updateFlight
);

// Delete a flight
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteFlight
);

module.exports = router;