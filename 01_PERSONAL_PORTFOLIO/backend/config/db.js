import mongoose from 'mongoose';

export let isConnectedToMongo = false;
export const memoryMessages = [];

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes('MY_MONGODB_CONNECTION_STRING')) {
    console.log('ℹ️ [Portfolio Backend] No MongoDB URI provided in .env - running with local memory store fallback.');
    isConnectedToMongo = false;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnectedToMongo = true;
    console.log(`✅ [Portfolio Backend] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ [Portfolio Backend] MongoDB Atlas connection warning: ${error.message}`);
    console.log('ℹ️ [Portfolio Backend] Active fallback store enabled so your portfolio contact form functions smoothly.');
    isConnectedToMongo = false;
  }
};
