const express = require("express");

const {
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create staff
router.post(
  "/",
  protect,
  authorizeRoles("admin", "staff"),
  createStaff
);

// Get all staff
router.get(
  "/",
  protect,
  authorizeRoles("admin", "staff"),
  getStaff
);

// Get one staff member
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  getStaffById
);

// Update staff
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  updateStaff
);

// Delete staff
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  deleteStaff
);

module.exports = router;