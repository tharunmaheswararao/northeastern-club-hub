import React, { useState, useEffect } from "react";
import { EventData } from "../models/Types";
import "./EventForm.css";

interface EventFormProps {
  onSubmit: (eventData: EventData) => void;
  onClose: () => void;
  formData?: EventData; // Optional prop for pre-filling form state
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onClose, formData }) => {
  const [formState, setFormState] = useState<EventData>({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    event_mode: "online",
    event_image: null,
  });

  useEffect(() => {
    if (formData) {
      setFormState(formData); // Prefill the state with existing event data
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormState({ ...formState, event_image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState); // Pass updated form state to parent component
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h1>{formData ? "Edit Event" : "Create an Event"}</h1>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Event Name:</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Event Description:</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Event Date:</label>
            <input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Event Time:</label>
            <input
              type="time"
              name="time"
              value={formState.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Event Location:</label>
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Event Mode:</label>
            <select
              name="event_mode"
              value={formState.event_mode}
              onChange={handleChange}
              required
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="form-group">
            <label>Event Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit" className="submit-button">
            {formData ? "Update Event" : "Submit Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;