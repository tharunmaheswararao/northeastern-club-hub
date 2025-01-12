import Event from '../models/Event.js';

// Creates a new event and saves it to the database
export const createEvent = async (newEvent) => {
    const event = new Event(newEvent); // Create a new instance
    await event.save(); // Save the event to the database
    return event;
};

export const getEventById = async (eventId) => {
    try {
        const event = await Event.findById(eventId);
        return event ? formatEventResponse(event) : null;
    } catch (error) {
        throw new Error("Error retrieving event details");
    }
};
  
  // Format the event response for the frontend
const formatEventResponse = (event) => ({
    id: event._id,
    name: event.name,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    event_mode: event.event_mode,
    event_image: event.event_image ? event.event_image.toString("base64") : null, // Convert buffer to Base64
});