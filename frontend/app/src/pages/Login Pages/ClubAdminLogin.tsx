import React from "react";
import { Container, Typography, Button } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import clubAdminService from "../../services/User-Auth/club-admin-service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ClubAdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const { token } = await clubAdminService.login(data);
      console.log(token.token, token.id, token.role);
      localStorage.setItem("token", token.token);
      localStorage.setItem("user_id", token.id);
      localStorage.setItem("user_role", token.role);
      navigate("/club-admin-dashboard"); // Navigate to Club Admin dashboard
    } catch (error: any) {
      alert(error.message || "Invalid email or password.");
    }
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <LoginForm
        onSubmit={handleLogin}
        redirectLink="/club-admin-signup"
      />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => changeLanguage("en")}
          sx={{ marginRight: 1 }}
        >
          {t("english")}
        </Button>
        <Button variant="outlined" onClick={() => changeLanguage("es")}>
          {t("spanish")}
        </Button>
      </Container>
    </Container>
  );
};

export default ClubAdminLogin;
