import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventData } from "../models/Types";
import "./EventDetails.css"; // Add custom CSS for styling


const EventDetails: React.FC = () => {

    const getLastPartOfURL = () => {
        const path = window.location.pathname;
        const parts = path.split("/").filter(Boolean); // Split by "/" and remove empty parts
        return parts[parts.length - 1]; // Return the last part
      };
    // Static event ID for now (can be replaced with a dynamic route in the future)
    const eventId = getLastPartOfURL();
    const navigate = useNavigate();

    // State to store event data and loading/error states
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch event details on component mount
    useEffect(() => {
        const fetchEventDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3002/api/club-admin/events/${eventId}`);
            if (!response.ok) {
            throw new Error(`Failed to fetch event details: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Fetched Event Data:", data);
            setEvent(data.data);
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error fetching event details:", err.message);
                setError(err.message);
            } else {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };
        fetchEventDetails();
    }, [eventId]);
  

    // Render loading, error, or event details based on state
    if (loading) {
        return <p>Loading event details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!event) {
        return <p>No event details found.</p>;
    }

    const handleNavigate = () => {
        const eventData = {
            event_name: event.name,
            date: event.date.split('T')[0],
            time: event.time,
            location: event.location
        }
        navigate("/enroll", { state: eventData });
    }

    return (
        <div className="event-details-container">
            {event.event_image && (
                <div className="event-image">
                <img src={`data:image/jpeg;base64,${event.event_image}`} alt={event.name} />
                </div>
            )}
            <div className="event-details">
                <h1>{event.name}</h1>
                <div className="event-metadata">
                    <p>
                        <strong>Date and Time:</strong> {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                    <p>
                        <strong>Location:</strong> {event.location}
                    </p>
                    <p>
                        <strong>Mode:</strong> {event.event_mode}
                    </p>
                </div>
                <div className="event-description">
                    <h2>Description</h2>
                    <p>{event.description}</p>
                </div>
            </div>
            <div className="event-rsvp">
                <button className="rsvp-button" onClick={handleNavigate}>RSVP to Event</button>
            </div>
        </div>
    );
};

export default EventDetails;