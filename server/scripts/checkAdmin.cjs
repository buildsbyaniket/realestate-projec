// checkAdmin.cjs - verify admin role for specific email
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.js').default;

const EMAIL = 'aniketdev005@gmail.com';

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: EMAIL });
    if (user) {
      console.log(`User ${EMAIL} role: ${user.role}`);
    } else {
      console.log('User not found');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
