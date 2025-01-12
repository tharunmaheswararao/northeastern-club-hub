// Establishes a connection to the MongoDB database
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Check if the MONGO_URI environment variable is defined
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error("MONGO_URI is undefined");

        // Connect to MongoDB
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with a failure
    }
};

export default connectDB;
