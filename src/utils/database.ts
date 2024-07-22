import mongoose from "mongoose";

let isConnected = false; //track the connection status

export const connectToDB = async () => {
  mongoose.set("strict", true);

  if (isConnected) {
    console.log("=> MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: process.env.MONGODB_DBNAME,
    });

    isConnected = true;
    console.log("=> MongoDB connected");
  } catch (error) {
    console.error("=> 'database.ts' Error connecting to database: ", error);
    return;
  }
};
