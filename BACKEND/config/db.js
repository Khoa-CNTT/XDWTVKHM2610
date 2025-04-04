const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed! Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
