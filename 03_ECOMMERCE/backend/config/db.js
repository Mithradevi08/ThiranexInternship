import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ [Ecommerce Backend] MongoDB Atlas Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ [Ecommerce Backend] MongoDB Atlas connection warning: ${error.message}`);
    console.log('💡 Note: Ensure your current IP is added in MongoDB Atlas (Network Access -> IP Access List: 0.0.0.0/0)');
    return null;
  }
};
