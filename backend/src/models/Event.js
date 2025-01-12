import mongoose from "mongoose";
//creating a schema for bookinge event
//represents booking made by a user
const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        event_mode: {
            type: String,
            enum: ["online", "offline"],
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        event_image: {
            type: Buffer, // Store image as binary data
            required: false,
        },
    },
    { timestamps: true }
); //automatically includes createdAt and updatedAt fields

const EventModel = mongoose.model('event', eventSchema);
export default EventModel;

