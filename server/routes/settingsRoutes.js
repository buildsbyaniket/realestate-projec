import express from "express";

import {
  getSettings,
  updateProfile,
  changePassword,
  deactivateAccount,
} from "../controllers/settingsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=========================================================
ALL SETTINGS ROUTES REQUIRE LOGIN
=========================================================
*/

router.use(protect);

/*
=========================================================
PROFILE / SETTINGS
=========================================================
*/

// GET /api/settings
router.get("/", getSettings);

// PUT /api/settings/profile
router.put("/profile", updateProfile);

/*
=========================================================
PASSWORD
=========================================================
*/

// PUT /api/settings/password
router.put("/password", changePassword);

/*
=========================================================
ACCOUNT
=========================================================
*/

// DELETE /api/settings/account
router.delete("/account", deactivateAccount);

export default router;