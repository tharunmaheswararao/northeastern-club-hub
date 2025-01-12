import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes whitespace
    },
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "clubAdmin", "platformAdmin"], // Allowed roles
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "rejected"], // Allowed statuses
      default: "active", // Default value
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to current timestamp
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Default to current timestamp
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

export default User;
