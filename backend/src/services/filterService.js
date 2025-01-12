import Event from "../models/Event.js";

export const searchEvents = async (filters) => {
  const query = {};

  try {
    // Add filters dynamically
    if (filters.name) {
      query.name = { $regex: filters.name, $options: "i" }; // Case-insensitive search
    }
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.startDate && filters.endDate) {
      if (new Date(filters.startDate) > new Date(filters.endDate)) {
        throw new Error("Start date cannot be greater than end date.");
      }
      query.date = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      };
    }

    // Execute the query with sorting
    const events = await Event.find(query).sort({ date: 1 }); // Sort by date ascending
    return events;
  } catch (error) {
    console.error("Error in searchEvents:", error.message);
    throw error; // Handle this error in the calling controller
  }
};

