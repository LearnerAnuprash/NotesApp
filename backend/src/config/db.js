import mongoose from "mongoose";

export const connectDB = async () => {
  //using connection string to connect to mongoDB database
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    // Throw errors in case of connection failure
    console.error("ERROR CONNECTING TO MONGODB !", error);
    process.exit(1); //exit with failure
  }
};
