import express from "express";

import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getPropertyStats,
} from "../controllers/propertyController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=========================================================
PROPERTY ROUTES
=========================================================
*/

/*
GET /api/properties
Get all properties
*/
router.get("/", protect, getProperties);

/*
GET /api/properties/stats
Property statistics
*/
router.get("/stats", protect, getPropertyStats);

/*
GET /api/properties/:id
Get one property
*/
router.get("/:id", protect, getProperty);

/*
POST /api/properties
Create property
*/
router.post("/", adminOnly, createProperty);

/*
PUT /api/properties/:id
Update property
*/
router.put("/:id", adminOnly, updateProperty);

/*
DELETE /api/properties/:id
Delete property
*/
router.delete("/:id", adminOnly, deleteProperty);

export default router;