import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import EventForm from "../components/EventForm";
import { EventData } from "../models/Types";
import "./MainEvents.css";

const MainEvents: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "info" | "warning">("success");
    const [isLoading, setIsLoading] = useState(false); // For submission feedback

    const role = localStorage.getItem("user_role");
    const userId = localStorage.getItem("user_id");
    console.log("User Role:", role);

    const handleCreateClick = () => {
        setIsFormVisible(true);
    };

    const handleEventSubmit = async (eventData: EventData) => {
        if (!userId) {
            setAlertMessage("User ID not found. Please log in again.");
            setAlertSeverity("error");
            return;
        }

        setIsLoading(true); // Show loading spinner
        try {
            const formData = new FormData();

            // Append all fields to the FormData object
            Object.entries(eventData).forEach(([key, value]) => {
                if (key === "event_image" && value) {
                    formData.append("image", value); // "image" matches Multer's configuration
                } else {
                    formData.append(key, value as string);
                }
            });

            formData.append("createdBy", userId);
            console.log(formData);

            // Replace hardcoded URL with environment variable
            const response = await fetch("http://localhost:3002/api/club-admin/events", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Event created successfully:", result);
                setAlertMessage("Event created successfully!");
                setAlertSeverity("success");
            } else {
                const errorText = await response.text();
                console.error("Failed to create event:", errorText);
                setAlertMessage("Failed to create event: " + errorText);
                setAlertSeverity("error");
            }
        } catch (error) {
            console.error("Error submitting event:", error);
            setAlertMessage("An error occurred while submitting the event.");
            setAlertSeverity("error");
        } finally {
            setIsLoading(false); // Stop loading spinner
        }

        setIsFormVisible(false);
    };

    return (
        <div className="main-events-container">
            {role === "clubAdmin" && (
                <>
                    <button className="create-button" onClick={handleCreateClick}>
                        Create Event
                    </button>

                    {isFormVisible && (
                        <EventForm
                            onSubmit={handleEventSubmit}
                            onClose={() => setIsFormVisible(false)}
                        />
                    )}

                    {/* Conditional Loading Spinner */}
                    {isLoading && (
                        <div className="loading-container">
                            <CircularProgress color="primary" />
                        </div>
                    )}

                    {/* Conditional Alert Rendering */}
                    {alertMessage && (
                        <div className="alert-container">
                            <Alert
                                severity={alertSeverity}
                                onClose={() => setAlertMessage(null)} // Allow manual dismissal
                            >
                                {alertMessage}
                            </Alert>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MainEvents;
