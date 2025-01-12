import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { EventData } from "../models/Types";

const EditEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (isoDate: string): string => {
    return new Date(isoDate).toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/club-admin/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();

        setEventData({
          ...data.data,
          date: formatDate(data.data.date),
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const handleSubmit = async (updatedEvent: EventData) => {
    try {
      const formData = new FormData();

      formData.append("name", updatedEvent.name);
      formData.append("description", updatedEvent.description);
      formData.append("date", updatedEvent.date);
      formData.append("time", updatedEvent.time);
      formData.append("location", updatedEvent.location);
      formData.append("event_mode", updatedEvent.event_mode);

      if (updatedEvent.event_image instanceof File) {
        formData.append("event_image", updatedEvent.event_image);
      }

      const response = await fetch(`http://localhost:3002/api/club-admin/events/${eventId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        navigate("/my-events");
      } else {
        throw new Error("Failed to update event");
      }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return eventData ? (
    <EventForm
      onSubmit={handleSubmit}
      onClose={() => navigate("/my-events")}
      formData={eventData} // Pass prefilled data to EventForm
    />
  ) : (
    <p>No event found.</p>
  );
};

export default EditEvent;
