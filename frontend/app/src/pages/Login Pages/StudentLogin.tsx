import React from "react";
import { Container, Typography, Button } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import studentService from "../../services/User-Auth/student-service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const { token } = await studentService.login(data);
      console.log(token.token, token.id, token.role);
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", token.id);
      localStorage.setItem("user_role", token.role);
      navigate("/student-home");
    } catch (err: any) {
      alert(err.response?.data?.error || t("invalidCredentials"));
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
      <LoginForm onSubmit={handleLogin} redirectLink="/student-signup" />
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
          English
        </Button>
        <Button variant="outlined" onClick={() => changeLanguage("es")}>
          Español
        </Button>
      </Container>
    </Container>
  );
};

export default StudentLogin;
