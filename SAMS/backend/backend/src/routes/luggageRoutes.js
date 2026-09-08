const express = require("express");

const {
  createLuggage,
  getLuggage,
  getLuggageById,
  updateLuggage,
  deleteLuggage,
} = require("../controllers/luggageController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create luggage
router.post(
  "/",
  protect,
  authorizeRoles("admin", "staff"),
  createLuggage
);

// Get all luggage
router.get(
  "/",
  protect,
  authorizeRoles("admin", "staff", "passenger"),
  getLuggage
);

// Get one luggage record
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "staff", "passenger"),
  getLuggageById
);

// Update luggage
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  updateLuggage
);

// Delete luggage
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  deleteLuggage
);

module.exports = router;