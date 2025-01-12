import React from "react";
import { Container } from "@mui/material";
import SignupForm from "../../components/SignupForm";
import studentService from "../../services/User-Auth/student-service";

const StudentSignup: React.FC = () => {
  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await studentService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "student",
      });
      alert("Signup successful! Please log in.");
    } catch (err: any) {
      alert(err.response?.data?.error || "An error occurred during signup");
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
      <SignupForm onSubmit={handleSignup} redirectLink="/login" />
    </Container>
  );
};

export default StudentSignup;
