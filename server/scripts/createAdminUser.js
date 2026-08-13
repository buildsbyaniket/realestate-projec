import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config({ path: './server/.env' });

const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      if (existing.role === 'admin') {
        console.log('Admin user already exists');
      } else {
        existing.role = 'admin';
        await existing.save();
        console.log('Existing user promoted to admin');
      }
      return;
    }
    const admin = new User({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('Admin user created with email:', adminEmail);
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
