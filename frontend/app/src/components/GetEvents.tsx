import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./GetEvents.css"; // Add CSS for styling
import Navbar from "./Navbar";

interface EventData {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  event_mode: string;
  event_image: string | null;
}

const GetEvent: React.FC = () => {
  const userId = localStorage.getItem("user_id"); // Replace with dynamic user ID
  const [events, setEvents] = useState<EventData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/club-admin/events/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      }
    };

    fetchEvents();
  }, [userId]);

  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      const response = await fetch(`http://localhost:3002/api/club-admin/events/${selectedEvent._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      setEvents(events.filter((event) => event._id !== selectedEvent._id));
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event");
    } finally {
      setOpenDialog(false); // Close dialog after deletion
    }
  };

  const handleEdit = (eventId: string) => {
    navigate(`/edit-my-event/${eventId}`);
  };

  const handleOpenDialog = (event: EventData) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    return words.length > 10 ? `${words.slice(0, 10).join(" ")}...` : description;
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!events.length) {
    return <p>No events found for this user.</p>;
  }

  return (
    <>
    <Navbar />
    <div className="get-events-container">
      <h1>My Events</h1>
      <div className="event-cards">
        {events.map((event) => (
          <Card key={event._id} sx={{ maxWidth: 345, margin: "1rem" }}>
            <CardMedia
              component="img"
              height="140"
              image={event.event_image || "/static/images/default-event.jpg"} // Fallback for missing images
              alt={event.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {truncateDescription(event.description)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: "1rem" }}>
                <strong>Date & Time:</strong> {new Date(event.date).toLocaleDateString()} at {event.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Location:</strong> {event.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Mode:</strong> {event.event_mode}
              </Typography>
            </CardContent>
            <div className="card-actions" style={{ padding: "1rem", display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" onClick={() => handleEdit(event._id)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleOpenDialog(event)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the event <strong>{selectedEvent?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
};

export default GetEvent;
