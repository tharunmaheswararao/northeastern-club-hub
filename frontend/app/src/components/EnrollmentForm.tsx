import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface EnrollmentFormProps {
  onEnroll: (student: { name: string; email: string }) => void;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ onEnroll }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    if (!name || !email) {
      alert("Please fill in all fields.");
      return;
    }
    onEnroll({ name, email });
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#1E1E1E" }}>
      <div
        style={{
          backgroundColor: "#1875D2",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ color: "white" }}>Northeastern Club Hub - User</p>
        <div style={{ display: "flex", gap: "8px", color: "white" }}>
          <EventIcon />
          <NotificationsIcon />
          <AccountCircleIcon />
        </div>
      </div>
      <div
        style={{
          margin: "auto",
          marginTop: "4rem",
          padding: "10px",
          width: "20rem",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          RSVP
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": { color: "#1875D2" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1875D2" },
              "&:hover fieldset": { borderColor: "#1875D2" },
              "&.Mui-focused fieldset": { borderColor: "#1875D2" },
            },
          }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": { color: "#1875D2" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1875D2" },
              "&:hover fieldset": { borderColor: "#1875D2" },
              "&.Mui-focused fieldset": { borderColor: "#1875D2" },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          style={{ marginTop: 16 }}
        >
          Enroll
        </Button>
      </div>
    </div>
  );
};

export default EnrollmentForm;