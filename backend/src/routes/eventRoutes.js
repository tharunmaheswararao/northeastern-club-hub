import express from "express";
import * as eventController from "../controllers/eventController.js";

const router = express.Router();

// Route for creating a new event, with multer middleware
router.route("/")
    .post(eventController.upload.single("image"), eventController.post);

router.route("/:id")
    .get(eventController.getEventById);

router.route("/user/:userId")
    .get(eventController.getEventsByUserId); // Get events by user ID
    
router.route("/:id")
    .put(eventController.upload.single("event_image"), eventController.updateEvent)
    .delete(eventController.deleteEvent); // Edit and delete by ID

export default router;