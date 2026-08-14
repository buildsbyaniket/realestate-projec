import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEnquiry,
  getEnquiriesForAgent,
  updateEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

// All enquiry routes require authentication
router.use(protect);

// Create a new enquiry (user → agent)
router.post("/", createEnquiry);

// Get enquiries for the logged‑in agent
router.get("/", getEnquiriesForAgent);

// Update enquiry status / response
router.put("/:id", updateEnquiry);

export default router;
