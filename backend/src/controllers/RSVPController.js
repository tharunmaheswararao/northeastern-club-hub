import * as rsvpService from "../services/RSVPService.js";
import {RSVPEventModel} from "../models/RSVP.js";

// Controller to create a new RSVP event
export const createEvent = async (req, res) => {
    try {
        // Get event data from the request body
        const eventData = req.body;

        // Call the service to create the event
        const newEvent = await rsvpService.createEvent(eventData);

        // Respond with the created event
        res.status(201).json(newEvent);
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
};

// Controller to get RSVP list for an event (Club Admin View)
export const getEventRSVPs = async (req, res) => {
    try {
        const attendees = await RSVPEventModel.find();
        console.log(attendees);
        res.status(200).json({ attendees });
    } catch (err) {
        res.status(err.message === "Event not found" ? 404 : 403).json({ error: err.message });
    }
};

// Controller for admin to approve/reject RSVP
export const handleRSVP = async (req, res) => {
    try {
        const { rsvpId, status } = req.body; // Accept or Reject
        const updatedRSVP = await rsvpService.updateRSVPStatus(rsvpId, status);

        // Send email notification to the user
        await sendRSVPNotification(updatedRSVP.email, status);

        res.status(200).json(updatedRSVP);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};