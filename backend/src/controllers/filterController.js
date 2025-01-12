import * as filterService from "../services/filterService.js";
import Event from "../models/Event.js";

export const searchEvents = async (req, res) => {
  try {
    const filters = {
      name: req.query.name,
      category: req.query.category,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      createdBy: req.query.createdBy,
    };

    const events = await filterService.searchEvents(filters);

    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
      // Fetch all events from the database
      const events = await Event.find();

      // Map through events to add base64 encoded images if available
      const eventsWithImages = events.map((event) => ({
          ...event._doc, // Spread event fields
          event_image: event.event_image
              ? `data:image/jpeg;base64,${event.event_image.toString("base64")}`
              : null, // Convert buffer to base64, or set to null if no image
      }));

      res.status(200).json({ data: eventsWithImages });
  } catch (err) {
      console.error("Error fetching all events:", err);
      res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const getEventsByDateRange = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query; // Extract query params
    console.log("Original From Date:", fromDate, "Original To Date:", toDate);

    // const adjustedFromDate = fromDate
    //   ? new Date(new Date(fromDate).setDate(new Date(fromDate).getDate() - 1))
    //   : undefined; // Decrement by one day
    // const adjustedToDate = toDate
    //   ? new Date(new Date(toDate).setDate(new Date(toDate).getDate() + 1))
    //   : undefined; // Increment by one day

    // console.log(
    //   "Adjusted From Date:",
    //   adjustedFromDate,
    //   "Adjusted To Date:",
    //   adjustedToDate
    // );

    // Build the filter query
    const filter = {};
    if (fromDate) filter.date = { $gte: fromDate };
    if (toDate) filter.date = { ...filter.date, $lte: toDate };

    console.log("Filter Query:", filter); // Log the filter for debugging

    const events = await Event.find(filter); // Query the database
    console.log("Events Found:", events);

    // Map through events to add base64 encoded images if available
    const eventsWithImages = events.map((event) => ({
      ...event._doc, // Spread event fields
      event_image: event.event_image
        ? `data:image/jpeg;base64,${event.event_image.toString("base64")}`
        : null, // Convert buffer to base64, or set to null if no image
    }));

    res.status(200).json({ data: eventsWithImages }); // Send back the results
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

