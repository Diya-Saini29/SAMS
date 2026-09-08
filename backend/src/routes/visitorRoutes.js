const express = require("express");

const {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitorController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Register a visitor
router.post(
  "/",
  protect,
  authorizeRoles("admin", "staff"),
  createVisitor
);

// Get all visitors
router.get(
  "/",
  protect,
  authorizeRoles("admin", "staff", "visitor"),
  getVisitors
);

// Get one visitor
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "staff", "visitor"),
  getVisitorById
);

// Update visitor
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  updateVisitor
);

// Delete visitor
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  deleteVisitor
);

module.exports = router;