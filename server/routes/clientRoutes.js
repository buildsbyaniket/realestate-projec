import express from "express";

import {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
  assignAgent,
  assignProperties,
} from "../controllers/clientController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=========================================================
ALL CLIENT ROUTES REQUIRE LOGIN
=========================================================
*/

router.use(protect);

/*
=========================================================
CLIENT MANAGEMENT
ADMIN ONLY
=========================================================
*/

// Create client
router.post("/", adminOnly, createClient);

// Get all clients
router.get("/", adminOnly, getClients);

// Get single client
router.get("/:id", adminOnly, getClient);

// Update client
router.put("/:id", adminOnly, updateClient);

// Delete client
router.delete("/:id", adminOnly, deleteClient);

/*
=========================================================
CLIENT RELATIONSHIPS
=========================================================
*/

// Assign agent to client
router.put("/:id/agent", adminOnly, assignAgent);

// Assign properties to client
router.put("/:id/properties", adminOnly, assignProperties);

export default router;