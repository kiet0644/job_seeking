import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database.
 *
 * The connection URI is obtained from the MONGO_URI environment variable.
 * If this variable is not set, the function defaults to a local MongoDB
 * instance at mongodb://127.0.0.1:27017.
 *
 * If the connection is successful, the function logs the message
 * 'MongoDB connected' to the console. If the connection fails, the function
 * logs the error message to the console and terminates the process with
 * exit code 1.
 */
export async function connectDB() {
  const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/';

  try {
    await mongoose.connect(uri, {
      // Removed deprecated options as they are now defaults in Mongoose
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
