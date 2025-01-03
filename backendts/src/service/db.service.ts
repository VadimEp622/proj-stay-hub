import mongoose from "mongoose";
import { appConfig } from "../config/app.config.ts";

export const connectDB = async () => {
  try {
    console.log(`${appConfig.DB_URL}${appConfig.DB_NAME}`);
    await mongoose.connect(`${appConfig.DB_URL}${appConfig.DB_NAME}`);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.log("Failed to connect to the db ❌");
    console.log(error);
  }
};
