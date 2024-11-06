import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017/weatherApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
