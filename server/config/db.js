const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas or Local MongoDB Database
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/career_compass';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Primary MongoDB Connection Error: ${error.message}`);
    
    // Fallback attempt to local MongoDB if primary URI fails and wasn't already local
    if (!uri.includes('127.0.0.1') && !uri.includes('localhost')) {
      console.log('🔄 Attempting fallback connection to local MongoDB (mongodb://127.0.0.1:27017/career_compass)...');
      try {
        const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/career_compass');
        console.log(`✅ Local MongoDB Connected: ${localConn.connection.host}`);
        return;
      } catch (localErr) {
        console.error(`❌ Local MongoDB Fallback also failed: ${localErr.message}`);
      }
    }

    console.log('\n========================================================================');
    console.log('📌 NOTE: Please update the MONGODB_URI in server/.env with your actual');
    console.log('   MongoDB Atlas Connection String (e.g., from MongoDB Cloud dashboard)');
    console.log('========================================================================\n');
  }
};

module.exports = connectDB;

