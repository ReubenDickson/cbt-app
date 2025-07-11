import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error("MongoDB Connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
// This code establishes a connection to a MongoDB database using Mongoose.
// It exports a function `connectDB` that attempts to connect to the database using the URI stored in the environment variable `MONGO_URI`.
// If the connection is successful, it logs a success message.
