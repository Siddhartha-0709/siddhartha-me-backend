import mongoose from "mongoose";
import app from "./app.js";
import 'dotenv/config'

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
const connectDB = async () => {
  await mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("MongoDB connected");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log('Some error occured in connecting to database- ',error);
      process.exit(1);
    });
};


connectDB();