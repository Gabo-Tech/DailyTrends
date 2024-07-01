import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.info('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

export default connectDB;