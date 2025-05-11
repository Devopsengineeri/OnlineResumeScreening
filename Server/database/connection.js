import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connection: ${conn.connection.host}`);
  } catch (error) {
    console.log("DB onnection Failed:", error.message);
  }
};
export default connectDB;
