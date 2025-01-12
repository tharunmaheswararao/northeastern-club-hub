import dotenv from "dotenv";
import express from "express";
import initialize from "./src/app.js";

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Initialize the application
initialize(app);

// Start the server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

