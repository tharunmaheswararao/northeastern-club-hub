import express from "express";
import * as RSVPController from "../controllers/RSVPController.js";

const router = express.Router();

// Route to create a new event
router.route('/')
    .post(RSVPController.createEvent);

// Route to get RSVP list for an event (Club Admin View)
router.route("/requests")
    .get(RSVPController.getEventRSVPs);

export default router;
