// server/seedUser.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './models/user.js';

dotenv.config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const email = 'seeduser@example.com';
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: 'Seed User',
        email,
        password: 'SeedPass123!', // will be hashed by pre-save middleware
        role: 'user',
      });
      console.log('Test user created');
    } else {
      console.log('Test user already exists');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
    console.log('JWT token:', token);
    process.exit(0);
  } catch (err) {
    console.error('Error creating test user', err);
    process.exit(1);
  }
};

createTestUser();
