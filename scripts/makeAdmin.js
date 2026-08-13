// makeAdmin.js
// Run this script with `node scripts/makeAdmin.js` to promote a user to admin.
import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../server/models/user.js';

const emailToPromote = 'aniketdev005@gmail.com';

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const user = await User.findOne({ email: emailToPromote });
    if (!user) {
      console.log(`User with email ${emailToPromote} not found.`);
      process.exit(1);
    }
    if (user.role === 'admin') {
      console.log('User is already admin.');
    } else {
      user.role = 'admin';
      await user.save();
      console.log(`User ${emailToPromote} promoted to admin.`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error promoting user:', err);
    process.exit(1);
  }
};

run();
