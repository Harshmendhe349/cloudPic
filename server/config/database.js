import mongoose from "mongoose";

const connectDb = async (url) => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

export default connectDb;

