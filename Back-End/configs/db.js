import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    return false;
  }
  try {
    await mongoose.connect("mongodb://localhost:27017/todoList-redux");
    console.log("Connect to Database successfully :))");
  } catch (error) {
    console.log("Connect to Database faild !!");
  }
};

export default connectToDB;
