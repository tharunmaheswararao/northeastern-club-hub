import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import EnrollmentForm from "../../components/EnrollmentForm";

interface Student {
  name: string;
  email: string;
}

const EnrollmentPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  const location = useLocation();
  const navigate = useNavigate(); // Navigation hook
  const eventData = location.state as { event_name: string; date: string; time: string; location: string };

  const handleEnroll = async (studentData: Student) => {
    const combinedData = { ...studentData, ...eventData };

    try {
      setLoading(true); // Start loading
      const response = await fetch("http://localhost:3002/api/user/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Event created successfully:", result);

        // Navigate to /student-home with success message
        navigate("/student-home", {
          state: {
            alertMessage: "RSVP'ed to Event Successfully!",
            alertSeverity: "success",
          },
        });
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
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ backgroundColor: "#1E1E1E", minHeight: "100vh", padding: "2rem" }}>
      <EnrollmentForm onEnroll={handleEnroll} />

      {/* Alert Message */}
      {alertMessage && (
        <div style={{ marginTop: "1rem" }}>
          <Alert severity={alertSeverity} onClose={() => setAlertMessage(null)}>
            {alertMessage}
          </Alert>
        </div>
      )}

      {/* Loading State */}
      {loading && <p style={{ color: "white", marginTop: "1rem" }}>Processing... Please wait.</p>}
    </div>
  );
};

export default EnrollmentPage;
