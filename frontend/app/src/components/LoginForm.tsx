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
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  redirectLink?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, redirectLink }) => {
  const { t } = useTranslation(); // Use the `useTranslation` hook
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError(t("errorMessage.requiredFields"));
      return;
    }
    setError("");
    onSubmit(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        {t("loginTitle")}
      </Typography>
      {error && (
        <Typography color="error" textAlign="center" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label={t("emailLabel")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label={t("passwordLabel")}
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
          {t("loginButton")}
        </Button>
      </form>
      <Typography textAlign="center" mt={2}>
        {t("noAccount")}{" "}
        <Link href={redirectLink || "/signup"} underline="hover">
          {t("signUpLink")}
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
