import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("ERROR:", err.message);
  }
};

export default connectToMongoDB;
