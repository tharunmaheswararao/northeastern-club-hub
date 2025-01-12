import {RSVPEventModel} from "../models/RSVP.js";

export const createEvent = async (eventData) => {
    // Create a new instance of the event model
    const newEvent = new RSVPEventModel(eventData);
    
    // Save the event to the database
    await newEvent.save();

    return newEvent; // Return the created event
};

// Service to get RSVP list for an event (Club Admin View)
export const getEventRSVPs = async () => {
    const events = await RSVPEventModel.find();
    if (!events) {
      throw new Error("Event not found");
    }
  
    // Flatten attendees with event name
    const attendees = events.flatMap((event) =>
      event.attendees.map((attendee) => ({
        name: attendee.name,
        email: attendee.email,
        eventName: event.name, // Add event name
      }))
    );
  
    return attendees;
};  

// Service to approve or reject an RSVP
export const updateRSVPStatus = async (rsvpId, status) => {
    const event = await RSVPEventModel.findOne({ "attendees._id": rsvpId });
    if (!event) {
        throw new Error("RSVP not found");
    }

    // Find the RSVP to update
    const rsvp = event.attendees.id(rsvpId);
    if (!rsvp) {
        throw new Error("RSVP not found");
    }

    rsvp.status = status; // Update the RSVP status
    await event.save(); // Save the changes

    // Send notification to the user
    await sendRSVPNotification(rsvp.email, status);

    return rsvp; // Return the updated RSVP
};