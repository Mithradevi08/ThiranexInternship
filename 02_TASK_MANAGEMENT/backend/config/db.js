import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ [TaskManager Backend] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ [TaskManager Backend] MongoDB Atlas connection warning: ${error.message}`);
    console.log('💡 Note: Ensure your current IP is added in MongoDB Atlas (Network Access -> IP Access List: 0.0.0.0/0)');
  }
};
