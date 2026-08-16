import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();

const app = express();

/*
=========================================================
MIDDLEWARE
=========================================================
*/

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);

app.use(express.json());

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve uploaded images
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
// Fallback for any unknown upload paths to avoid proxy 502 errors
app.use('/uploads/*', (req, res) => {
  res.status(404).json({ success: false, message: 'Image not found' });
});


app.use(express.urlencoded({ extended: true }));

/*
=========================================================
ROUTES
=========================================================
*/

app.use("/api/auth", authRoutes);

app.use("/api/clients", clientRoutes);

app.use("/api/properties", propertyRoutes);

app.use("/api/agents", agentRoutes);

app.use("/api/enquiries", enquiryRoutes);

// Reports
app.use("/api/reports", reportRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Settings routes
app.use("/api/settings", settingsRoutes);

/*
=========================================================
TEST ROUTE
=========================================================
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PropManage API is running",
  });
});

// 404 handler for unknown routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Global error handling middleware
app.use(errorHandler);

/*
=========================================================
DATABASE
=========================================================
*/

const connectDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

/*
=========================================================
START SERVER
=========================================================
*/

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  await connectDatabase();
  const PORT = Number(process.env.PORT) || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please free the port and restart.`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
};

startServer();