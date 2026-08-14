import express from "express";

import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportSummary,
} from "../controllers/reportController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=========================================================
ADMIN REPORT ROUTES
=========================================================
*/

// Dashboard statistics
router.get(
  "/summary",
  protect,
  adminOnly,
  getReportSummary
);

// Get all reports
router.get(
  "/",
  protect,
  adminOnly,
  getReports
);

// Get single report
router.get(
  "/:id",
  protect,
  adminOnly,
  getReportById
);

// Create report
router.post(
  "/",
  protect,
  adminOnly,
  createReport
);

// Update report
router.put(
  "/:id",
  protect,
  adminOnly,
  updateReport
);

// Delete report
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteReport
);

export default router;