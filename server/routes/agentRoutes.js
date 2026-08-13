import express from "express";

import {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
  getAgentStats,
} from "../controllers/agentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=========================================================
ALL AGENT ROUTES REQUIRE LOGIN
=========================================================
*/

router.use(protect);

/*
IMPORTANT:
Keep /stats BEFORE /:id.
Otherwise Express may interpret "stats" as an agent ID.
*/

router.get("/stats", getAgentStats);

router.get("/", getAgents);

router.get("/:id", getAgentById);

router.post("/", adminOnly, createAgent);

router.put("/:id", adminOnly, updateAgent);

router.delete("/:id", adminOnly, deleteAgent);

export default router;