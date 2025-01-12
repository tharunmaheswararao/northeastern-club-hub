import * as eventService from '../services/eventService.js';
import { setSuccess, setError } from '../utils/response-handler.js';
import Event from "../models/Event.js";
import multer from 'multer';

// Configure Multer to store the image in memory
const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Handles the creation of a new event
export const post = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file); // This should log the uploaded image
    
        const newEvent = {
            ...req.body,
            event_image: req.file ? req.file.buffer : null, // Save the image buffer
        };
    
        const event = await eventService.createEvent(newEvent);
        setSuccess(event, res);
    } catch (err) {
        console.error("Error creating event:", err);
        setError(err, res);
    }
};

export const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id; // Extract event ID from request parameters
        // console.log(eventId);
        const event = await eventService.getEventById(eventId);
    
        if (!event) {
            return setError({ message: "Event not found" }, res, 404);
        }
    
        setSuccess(event, res);
    } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error, res);
    }
};

export const getEventsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const events = await Event.find({ createdBy: userId });

        const eventsWithImages = events.map((event) => ({
        ...event._doc, // Spread event fields
        event_image: event.event_image
            ? `data:image/jpeg;base64,${event.event_image.toString("base64")}`
            : null, // Convert buffer to base64, or set to null if no image
        }));

        res.status(200).json({ data: eventsWithImages });
    } catch (err) {
        console.error("Error fetching events by user ID:", err);
        res.status(500).json({ message: "Failed to fetch events" });
    }
};
  
export const updateEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Prepare update object
      const updateData = { ...req.body };
  
      // If a new image is uploaded, set it in the update object
      if (req.file) {
        console.log("File received for update:", req.file);
        updateData.event_image = req.file.buffer; // Save the file as a buffer
      } else {
        console.log("No file received or file missing");
      }
  
      // Update the event in the database
      const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ data: updatedEvent });
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Failed to update event" });
    }
};  

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Failed to delete event" });
    }
};
  
  