import express from "express";
import * as filterController from "../controllers/filterController.js";

const router = express.Router();

router.route('/')
  .get(filterController.getAllEvents);

router.route("/datefilters")
  .get(filterController.getEventsByDateRange);

export default router; // Use `export default` instead of `module.exports`


