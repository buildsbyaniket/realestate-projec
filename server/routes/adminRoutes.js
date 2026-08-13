// server/routes/adminRoutes.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
router.get(
  '/users',
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  })
);

// @desc    Update user role (admin only)
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
router.patch(
  '/users/:id/role',
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ success: false, message: 'Role is required' });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.role = role;
    await user.save();
    res.json({ success: true, message: 'User role updated', user: user.toObject() });
  })
);

export default router;
