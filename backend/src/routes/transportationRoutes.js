const express = require("express");

const {
  createTransportation,
  getTransportation,
  getTransportationById,
  updateTransportation,
  deleteTransportation,
} = require("../controllers/transportationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Schedule transportation
router.post(
  "/",
  protect,
  authorizeRoles("admin", "transport_operator"),
  createTransportation
);

// Get all transportation records
router.get(
  "/",
  protect,
  authorizeRoles("admin", "staff", "passenger", "transport_operator"),
  getTransportation
);

// Get one transportation record
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "staff", "passenger", "transport_operator"),
  getTransportationById
);

// Update transportation
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "transport_operator"),
  updateTransportation
);

// Delete transportation
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTransportation
);

module.exports = router;