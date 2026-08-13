import User from "../models/User.js";

/*
=========================================================
GET MY SETTINGS / PROFILE
GET /api/settings
=========================================================
*/

export const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load settings",
    });
  }
};


/*
=========================================================
UPDATE PROFILE
PUT /api/settings/profile
=========================================================
*/

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      name,
      phone,
      avatar,
    } = req.body || {};

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /*
    -------------------------------------------------------
    UPDATE ONLY ALLOWED PROFILE FIELDS
    -------------------------------------------------------
    */

    if (name !== undefined) {
      const trimmedName = name.trim();

      if (trimmedName.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Name must contain at least 2 characters",
        });
      }

      if (trimmedName.length > 100) {
        return res.status(400).json({
          success: false,
          message: "Name cannot exceed 100 characters",
        });
      }

      user.name = trimmedName;
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (avatar !== undefined) {
      user.avatar = avatar.trim();
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};


/*
=========================================================
CHANGE PASSWORD
PUT /api/settings/password
=========================================================
*/

export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body || {};

    /*
    -------------------------------------------------------
    VALIDATION
    -------------------------------------------------------
    */

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password, new password and confirm password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must contain at least 6 characters",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    /*
    -------------------------------------------------------
    FIND USER INCLUDING PASSWORD
    -------------------------------------------------------
    */

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /*
    -------------------------------------------------------
    CHECK CURRENT PASSWORD
    -------------------------------------------------------
    */

    const passwordCorrect = await user.comparePassword(
      currentPassword
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    /*
    -------------------------------------------------------
    SAVE NEW PASSWORD
    -------------------------------------------------------
    Your User model's pre-save middleware will hash it.
    -------------------------------------------------------
    */

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};


/*
=========================================================
DELETE / DEACTIVATE MY ACCOUNT
DELETE /api/settings/account
=========================================================
*/

export const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = false;

    await user.save({
      validateBeforeSave: false,
    });

    return res.status(200).json({
      success: true,
      message: "Account deactivated successfully",
    });
  } catch (error) {
    console.error("Deactivate account error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to deactivate account",
    });
  }
};