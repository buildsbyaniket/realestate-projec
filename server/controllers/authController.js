// server/controllers/authController.js

import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

import sendEmail from "../utils/sendEmail.js";
/* =========================================================
   JWT
========================================================= */

const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

/* =========================================================
   REGISTER
   POST /api/auth/register
========================================================= */

export const register = async (req, res) => {
  try {
    console.log("Register request received");
    console.log("Request body:", req.body);

    const { name, email, password } = req.body || {};

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters",
      });
    }

    /* -----------------------------------------------------
       CHECK EMAIL
    ----------------------------------------------------- */

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
        redirectUrl: "/login",
      });
    }

    /* -----------------------------------------------------
       CREATE USER
       
       Password is automatically hashed by the
       pre("save") middleware in user.js
    ----------------------------------------------------- */

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password,
      role: normalizedEmail === 'aniketdev005@gmail.com' ? 'admin' : 'user',
    });

    /* -----------------------------------------------------
       CREATE JWT
    ----------------------------------------------------- */

    const token = generateToken(user._id.toString());

    /* -----------------------------------------------------
       RESPONSE
    ----------------------------------------------------- */

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: user.toSafeObject(),
      redirectUrl: "/dashboard",
    });
  } catch (error) {
    console.error("Register error:", error);

    /* -----------------------------------------------------
       DUPLICATE EMAIL SAFETY CHECK
    ----------------------------------------------------- */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
        redirectUrl: "/login",
      });
    }

    /* -----------------------------------------------------
       MONGOOSE VALIDATION ERROR
    ----------------------------------------------------- */

    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];

      return res.status(400).json({
        success: false,
        message: firstError?.message || "Invalid registration data",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

/* =========================================================
   LOGIN
   POST /api/auth/login
========================================================= */

export const login = async (req, res) => {
  try {
    console.log("Login request received");
    console.log("Request body:", req.body);

    const { email, password } = req.body || {};

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    /* -----------------------------------------------------
       FIND USER
       
       password has select:false in User model,
       so explicitly include it.
    ----------------------------------------------------- */

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    /* -----------------------------------------------------
       USER NOT FOUND
       
       IMPORTANT:
       Do NOT create a token here.
    ----------------------------------------------------- */

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
        redirectUrl: "/register",
      });
    }

    /* -----------------------------------------------------
       ACCOUNT STATUS
    ----------------------------------------------------- */

    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated",
      });
    }

    /* -----------------------------------------------------
       CHECK PASSWORD
    ----------------------------------------------------- */

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    /* -----------------------------------------------------
       UPDATE LAST LOGIN
    ----------------------------------------------------- */

    user.lastLogin = new Date();

    await user.save({
      validateBeforeSave: false,
    });

    /* -----------------------------------------------------
       CREATE JWT
    ----------------------------------------------------- */

    const token = generateToken(user._id.toString());

    /* -----------------------------------------------------
       SUCCESS RESPONSE
    ----------------------------------------------------- */

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: user.toSafeObject(),
      redirectUrl: user.role === 'admin' ? '/admin' : '/dashboard',
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* =========================================================
   GET CURRENT USER
   GET /api/auth/me
   Protected
========================================================= */

export const getMe = async (req, res) => {
  try {
    /* -----------------------------------------------------
       protect middleware should set req.user
    ----------------------------------------------------- */

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    return res.status(200).json({
      success: true,
      user: req.user.toSafeObject(),
    });
  } catch (error) {
    console.error("GetMe error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

/* =========================================================
   FORGOT PASSWORD
   POST /api/auth/forgot-password
========================================================= */

export const forgotPassword = async (req, res) => {
  try {
    console.log("Forgot password request received");
    console.log("Request body:", req.body);

    const { email } = req.body || {};

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    /* -----------------------------------------------------
       FIND USER
    ----------------------------------------------------- */

    const user = await User.findOne({
      email: normalizedEmail,
    });

    /*
      Security-friendly response:
      Don't reveal whether an email exists.
    */

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account with that email exists, a password reset link will be sent.",
      });
    }

    /* -----------------------------------------------------
       CREATE RESET TOKEN
    ----------------------------------------------------- */

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedResetToken;

    user.resetPasswordExpire =
      Date.now() + 10 * 60 * 1000;

    await user.save({
      validateBeforeSave: false,
    });

    /*
      NOTE:
      This keeps the reset functionality working.
      If you already have Nodemailer/email sending code,
      you can place it here.
    */

      // Send password reset email
      try {
        const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
        console.log('🔗 Password reset URL →', resetUrl);
        const message = `You requested a password reset. Click the link below to reset your password (valid for 10 minutes):\n\n${resetUrl}`;
        await sendEmail({
          to: normalizedEmail,
          subject: 'Password Reset Request',
          text: message,
          html: `<p>You requested a password reset.</p><p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 10 minutes.</p>`,
        });
        console.log('Password reset email sent to', normalizedEmail);
        return res.status(200).json({
          success: true,
          message: 'Password reset email sent if account exists',
        });
      } catch (emailErr) {
        console.error('Error sending password reset email:', emailErr);
        return res.status(500).json({
          success: false,
          message: 'Failed to send reset email',
        });
      }
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process forgot password request",
    });
  }
};

/* =========================================================
   RESET PASSWORD
   POST /api/auth/reset-password/:token
========================================================= */

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body || {};

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Reset token is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters",
      });
    }

    /* -----------------------------------------------------
       HASH TOKEN
    ----------------------------------------------------- */

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    /* -----------------------------------------------------
       FIND USER
    ----------------------------------------------------- */

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }

    /* -----------------------------------------------------
       UPDATE PASSWORD
       
       User model pre-save middleware will hash it.
    ----------------------------------------------------- */

    user.password = password;

    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    /* -----------------------------------------------------
       CREATE NEW TOKEN
    ----------------------------------------------------- */

    const authToken = generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
      token: authToken,
      user: user.toSafeObject(),
      redirectUrl: "/dashboard",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Password reset failed",
    });
  }
};

/* =========================================================
   UPDATE PROFILE
   PUT /api/auth/profile
   Protected
========================================================= */

export const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const {
      name,
      email,
      avatar,
      phone,
    } = req.body || {};

    /* -----------------------------------------------------
       UPDATE NAME
    ----------------------------------------------------- */

    if (name !== undefined) {
      const normalizedName = name.trim();

      if (normalizedName.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Name must contain at least 2 characters",
        });
      }

      req.user.name = normalizedName;
    }

    /* -----------------------------------------------------
       UPDATE EMAIL
    ----------------------------------------------------- */

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: {
          $ne: req.user._id,
        },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "An account with this email already exists",
        });
      }

      req.user.email = normalizedEmail;
    }

    /* -----------------------------------------------------
       UPDATE AVATAR
    ----------------------------------------------------- */

    if (avatar !== undefined) {
      req.user.avatar = avatar;
    }

    /* -----------------------------------------------------
       UPDATE PHONE
    ----------------------------------------------------- */

    if (phone !== undefined) {
      req.user.phone = phone.trim();
    }

    /* -----------------------------------------------------
       SAVE
    ----------------------------------------------------- */

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: req.user.toSafeObject(),
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

/* =========================================================
   CHANGE PASSWORD
   PUT /api/auth/change-password
   Protected
========================================================= */

export const changePassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const {
      currentPassword,
      newPassword,
    } = req.body || {};

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must contain at least 6 characters",
      });
    }

    /* -----------------------------------------------------
       GET PASSWORD
    ----------------------------------------------------- */

    const user = await User.findById(req.user._id).select(
      "+password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* -----------------------------------------------------
       CHECK CURRENT PASSWORD
    ----------------------------------------------------- */

    const isPasswordCorrect =
      await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    /* -----------------------------------------------------
       SET NEW PASSWORD
       
       User model pre-save middleware hashes it.
    ----------------------------------------------------- */

    user.password = newPassword;

    await user.save();

    /* -----------------------------------------------------
       NEW TOKEN
    ----------------------------------------------------- */

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
      token,
      user: user.toSafeObject(),
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};