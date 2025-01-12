import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String }, // Event name
    description: { type: String }, // Event description
    date: { type: Date }, // Event date
    location: { type: String }, // Event location
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who created the event
  },
  { timestamps: true } // Automatically manage `createdAt` and `updatedAt`
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
