import React from "react";
import { Container } from "@mui/material";
import SignupForm from "../../components/SignupForm";
import platformAdminService from "../../services/User-Auth/platform-admin-service";

const PlatformAdminSignup: React.FC = () => {
  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await platformAdminService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "platformAdmin", // Role-specific data for Platform Admin
      });
      alert("Signup successful! Please log in.");
    } catch (error: any) {
      alert(error.message || "An error occurred during signup.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <SignupForm onSubmit={handleSignup} redirectLink="/platform-admin-login" />
    </Container>
  );
};

export default PlatformAdminSignup;
