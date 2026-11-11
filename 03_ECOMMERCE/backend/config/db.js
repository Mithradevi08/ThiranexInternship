import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ [Ecommerce Backend] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ [Ecommerce Backend] MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
