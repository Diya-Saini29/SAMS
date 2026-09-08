const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");
const luggageRoutes = require("./routes/luggageRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const staffRoutes = require("./routes/staffRoutes");
const transportationRoutes = require("./routes/transportationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Operational routes
app.use("/api/flights", flightRoutes);
app.use("/api/luggage", luggageRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/transportation", transportationRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Airport System API is running"
    });
});

// Server port
const PORT = process.env.PORT || 5000;

// Start server only after MongoDB connects
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();