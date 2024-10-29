import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const mongo_uri = process.env.MONGO_URI_CLOUD;
const mongoConnect = async () => {
    try {
        await mongoose.connect(mongo_uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
};

export default mongoConnect;