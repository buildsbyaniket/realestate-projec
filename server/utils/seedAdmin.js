// server/utils/seedAdmin.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Admin credentials (as requested)
const ADMIN_EMAIL = "aniketdev005@gmail.com";
const ADMIN_PASSWORD = "Aniket@2005";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const adminUser = new User({
      name: "Aniket Dev",
      email: ADMIN_EMAIL,
      password: hashed,
      role: "admin",
    });
    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
