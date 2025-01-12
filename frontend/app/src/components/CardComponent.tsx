import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

interface CardComponentProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, title, description, buttonText, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345, textAlign: 'center', margin: 'auto', padding: '16px' }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: "250px", // Ensure width is fixed
          height: "250px", // Ensure height matches width
          borderRadius: "50%", // Make it circular
          margin: "16px auto", // Center the image
          objectFit: "cover", // Ensure the image fits well
        }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          sx={{ marginTop: '16px', backgroundColor: '#a50f15', '&:hover': { backgroundColor: '#d32f2f' } }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
