import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    passwordHash: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["student", "clubAdmin", "platformAdmin"], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["active", "pending", "rejected"], 
      default: "active" 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    },
});

export default mongoose.model("User", userSchema);
