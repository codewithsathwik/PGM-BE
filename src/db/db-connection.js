import mongoose from "mongoose";

async function connectDB (){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB connection error");
        process.exit(1)
    }
}

export default connectDB;