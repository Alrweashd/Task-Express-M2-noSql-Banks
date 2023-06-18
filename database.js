const mongoose = require("mongoose");
let dotenv = require("dotenv").config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("errorrr hereeeeeeee", error);
  }
};
module.exports = connectDB;
