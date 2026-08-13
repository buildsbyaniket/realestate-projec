import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/RealEstateDB");

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Database Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;