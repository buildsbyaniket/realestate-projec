// makeAdmin.js - run with Node to set admin role for a specific email
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('C:/Users/anike/OneDrive/Desktop/Code/NewRealEstateproject/server/models/user.js');

const ADMIN_EMAIL = 'aniketdev005@gmail.com';

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    const result = await User.updateOne({ email: ADMIN_EMAIL }, { role: 'admin' });
    console.log(`Matched ${result.matchedCount} document(s), modified ${result.modifiedCount} document(s).`);
    process.exit(0);
  } catch (err) {
    console.error('Error updating admin role:', err);
    process.exit(1);
  }
})();
