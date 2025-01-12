import mongoose from "mongoose";

// Creating a schema for events
const reminderSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
}, { _id: false }); // Prevents MongoDB from creating a separate ID for each reminder

const rsvpEventSchema = new mongoose.Schema({
    event_name: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    time: {
        type: String,
        required: true,
    },
    location: { 
        type: String, 
        required: true 
    },
    name: {
        type: String,
        required: true,
    },
    email: { 
      type: String, 
      required: true,
    }
}, { timestamps: true }); // Automatically includes createdAt and updatedAt fields

// Creating a model for the schema
export const RSVPEventModel = mongoose.model('Rsvp', rsvpEventSchema);
export const RSVPRemainderModel = mongoose.model('Remainders', reminderSchema);
