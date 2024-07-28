import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    return false;
  }
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connect to Database successfully :))");
  } catch (error) {
    console.log("Connect to Database faild !!");
  }
};

export default connectToDB;
