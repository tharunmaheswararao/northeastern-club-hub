import React from "react";
import { Container } from "@mui/material";
import SignupForm from "../../components/SignupForm";
import clubAdminService from "../../services/User-Auth/club-admin-service";

const ClubAdminSignup: React.FC = () => {
  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await clubAdminService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "clubAdmin", // Role-specific data for Club Admin
      });
      alert("Signup successful! Please wait for verification.");
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
      <SignupForm onSubmit={handleSignup} redirectLink="/club-admin-login" />
    </Container>
  );
};

export default ClubAdminSignup;
