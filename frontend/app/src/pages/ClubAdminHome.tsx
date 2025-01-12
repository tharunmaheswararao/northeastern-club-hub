import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/Navbar";
import MainEvents from "./MainEvents";

const truncateDescription = (description: string, wordLimit: number = 10): string => {
  if (!description) return "No description available.";
  const words = description.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : description;
};

const ClubAdminHome: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]); // Events filtered by search or date
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (fromDate) queryParams.append("fromDate", fromDate);
        if (toDate) queryParams.append("toDate", toDate);

        const response = await fetch(`http://localhost:3002/api/filters/datefilters?${queryParams.toString()}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setEvents(result.data); // Original events
        setFilteredEvents(result.data); // Default filtered events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [fromDate, toDate]);

  // Update events based on search query
  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const handleCardClick = (id: string) => {
    navigate(`/events/${id}`);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#444",
            borderRadius: "4px",
            padding: "2px 10px",
            width: "300px",
          }}
        >
        
        <InputBase
          placeholder="Search Events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            color: "#fff",
            width: "100%",
          }}
        />
        <SearchIcon sx={{ color: "#fff", marginRight: "5px" }} />
        </Box>
      </Navbar>

      {/* Title, Date Filters, and Create Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1e1e1e",
          px: 4,
          py: 2,
          color: "#fff",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginRight: "auto", fontWeight: "bold" }}>
          Events
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ backgroundColor: "#fff", borderRadius: "4px", width: "160px" }}
          />
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ backgroundColor: "#fff", borderRadius: "4px", width: "160px" }}
          />
          <MainEvents />
        </Box>
      </Box>

      {/* Events List */}
      <Box
        sx={{
          padding: "2rem",
          backgroundColor: "#1e1e1e",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item key={event._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: "#2a2a2a",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: 2,
                }}
                onClick={() => handleCardClick(event._id)}
              >
                {event.event_image && (
                  <img
                    src={event.event_image}
                    alt={event.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                    {event.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa", marginTop: "0.5rem" }}>
                    {truncateDescription(event.description)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#aaa", marginTop: "0.5rem" }}
                  >
                    Date: {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    Location: {event.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ClubAdminHome;
