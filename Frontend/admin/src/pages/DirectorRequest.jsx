import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "../css/director.css"

export default function DirectorRequest() {
  const email = localStorage.getItem("user email");
  console.log(email);
  const backendBaseUrl = 'http://localhost:5000';

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user requests based on email
    axios.get(`${backendBaseUrl}/api/drequest/${email}`)
      .then((response) => {
        const requestsData = response.data;
        setRequests(requestsData);
      })
      .catch((error) => {
        console.error('Error fetching user requests:', error);
      });
  }, [email]);

  console.log(requests);

  const handleChatClick = (actorEmail) => {
    // Navigate to the Chat page with the director_email as a URL parameter
    navigate(`/home/dchat`);
    localStorage.setItem("actor email", actorEmail);
  };

  return (
    <div className='director-container'>
      <Container sx={{ py: 8 }} width={'100%'} style={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={1}>
          {requests.map((request) => (
            <Grid key={request._id} xs={12} sm={6} md={3.5} style={{ marginLeft: '40px', marginTop: '20px' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>
                    Name: {request.actor_name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ backgroundColor: '#483485', marginTop: '10px' }}
                    onClick={() => handleChatClick(request.actor_email)}
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
  );
}
