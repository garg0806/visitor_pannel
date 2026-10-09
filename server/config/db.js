import mongoose from "mongoose";

const DEFAULT_MONGODB_URI = "mongodb://127.0.0.1:27017/companyportal";

export const resolveMongoUri = () => {
  const configuredUri = process.env.MONGODB_URI?.trim();

  return configuredUri || DEFAULT_MONGODB_URI;
};

const connectDB = async () => {
  const mongoUri = resolveMongoUri();

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;