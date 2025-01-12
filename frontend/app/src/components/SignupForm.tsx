import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface SignupFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  redirectLink?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, redirectLink }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    onSubmit(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Sign Up
      </Typography>
      {error && (
        <Typography color="error" textAlign="center" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#FD514E" },
            paddingY: 1.5,
            marginTop: 2,
          }}
        >
          Sign Up
        </Button>
      </form>
      <Typography textAlign="center" mt={2}>
        Already have an account?{" "}
        <Link href={redirectLink || "/login"} underline="hover">
          Log in
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
