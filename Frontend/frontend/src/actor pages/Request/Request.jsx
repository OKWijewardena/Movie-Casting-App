import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from '../../components/NavBar';
import background_image from '../../temp_images/request_background.png'

export default function Request() {
  const email = localStorage.getItem("user email");
  const backendBaseUrl = 'http://localhost:5000';

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user requests based on email
    axios.get(`${backendBaseUrl}/api/request/${email}`)
      .then((response) => {
        const requestsData = response.data;
        setRequests(requestsData);
      })
      .catch((error) => {
        console.error('Error fetching user requests:', error);
      });
  }, [email]);

  const handleChatClick = (directorEmail) => {
    // Navigate to the Chat page with the director_email as a URL parameter
    navigate(`/chat`);
    localStorage.setItem("director email", directorEmail);
  };

  return (
    <div>
      <NavBar />
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <br />
      <br />
      <br />
      
        <img
          src={background_image}
          alt=""
          style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
        <Container sx={{ py: 8 }} width={'100%'} style={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={1}>
            {requests.map((request) => (
              <Grid key={request._id} xs={12} sm={6} md={3.5} style={{ marginLeft: '40px', marginTop: '20px' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {request.director_description}
                    </Typography>
                    <Typography>
                      Name: {request.director_name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ backgroundColor: '#483485', marginTop: '10px' }}
                      onClick={() => handleChatClick(request.director_email)}
                    >
                      Chat
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
