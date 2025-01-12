import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import CardComponent from '../components/CardComponent';
import studentImg from '../assets/student-img.jpg';
import clubAdminImg from '../assets/clubAdmin-img.jpg';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    console.log('Student Login');
    navigate('/student-login');
  };

  const handleClubAdminLogin = () => {
    // Redirect to ClubAdmin Login
    navigate('/club-admin-login');
  };

  const handlePlatformAdminLogin = () => {
    // Redirect to PlatformAdmin Login
    navigate('/platform-admin-login');
  };

  return (
    <Container
      sx={{
        height: '95vh', // Full viewport height
        display: 'flex', // Enable flexbox
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        textAlign: 'center', // Align text to the center
      }}
      >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Northeastern Club Hub
      </Typography>
      <br /><br />
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <CardComponent
            image={studentImg}
            title="Student"
            description="For students to easily navigate and keep track of club events."
            buttonText="Student Login"
            onClick={handleStudentLogin}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardComponent
            image={clubAdminImg}
            title="Club Admin"
            description="For Club Admin to manage their respective club at Northeastern."
            buttonText="Club Admin Login"
            onClick={handleClubAdminLogin}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardComponent
            image={clubAdminImg}
            title="Platform Admin"
            description="Available for Platform Admin to manage Clubs at Northeastern."
            buttonText="Platform Admin Login"
            onClick={handlePlatformAdminLogin}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
