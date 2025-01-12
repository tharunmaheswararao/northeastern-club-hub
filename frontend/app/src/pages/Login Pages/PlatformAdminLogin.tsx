import React from "react";
import { Container } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import platformAdminService from "../../services/User-Auth/platform-admin-service";
import { useNavigate } from "react-router-dom";

const PlatformAdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const { token } = await platformAdminService.login(data);
      console.log(token.token, token.id, token.role);
      localStorage.setItem("token", token.token);
      localStorage.setItem("user_id", token.id);
      localStorage.setItem("user_role", token.role);
      navigate("/platform-admin-dashboard"); // Navigate to Platform Admin dashboard
    } catch (error: any) {
      alert(error.message || "Invalid email or password.");
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
      <LoginForm
        onSubmit={handleLogin}
        redirectLink="/platform-admin-signup"
      />
    </Container>
  );
};

export default PlatformAdminLogin;
