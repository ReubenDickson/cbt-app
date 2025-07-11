import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  staffId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
// This schema defines the structure for admin documents in the MongoDB database.
// It includes fields for the admin's name, staff ID, email, and password hash.
// The `timestamps` option automatically adds `createdAt` and `updatedAt` fields to the schema.