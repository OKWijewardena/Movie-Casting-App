import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Container, Paper } from '@mui/material';
import NavBar from '../../components/NavBar';
import background from '../../temp_images/chat_background.png'

const API_BASE_URL = 'http://localhost:5000/api/messages'; // Replace with your Flask backend URL

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setmessage] = useState('');

  const actor_email = localStorage.getItem('user email');
  const director_email = localStorage.getItem('director email');
  const name = localStorage.getItem('user name');

  useEffect(() => {
    // Fetch all messages data from your backend API
    axios.get(API_BASE_URL)
      .then((response) => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching message:', error);
      });
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      actor_email: actor_email,
      director_email: director_email,
      message: message,
      name: name,
    };

    axios.post(API_BASE_URL, userMessage)
      .then((response) => {
        console.log(response.data);
        // Auto-refresh the page after sending the message
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        // Optionally, you can show an error message to the user
      });
  };

  return (
    <div>
      <NavBar />
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      
        <img
          src={background}
          alt=""
          style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      <Container maxWidth="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Box mt={3} p={3} component={Paper} elevation={3} >
          <h1 style={{ textAlign: 'center' }}>Chat App</h1>
          <Box mt={2}>
            {messages
              .filter((message) => message.actor_email === actor_email)
              .filter((message) => message.director_email === director_email)
              .map((message, index) => (
                <Box key={index} p={2} mb={2} component={Paper} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1, marginRight: '10px', fontSize: '10px' }}>{message.name}</div>
                  <div style={{ flex: 3, maxWidth:'300px' }}>{message.message}</div>
                </Box>
              ))}
          </Box>
          <Box mt={2} display="flex" alignItems="center">
            <TextField
              fullWidth
              variant="outlined"
              label="Type your message"
              onChange={(e) => setmessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              style={{ marginLeft: '10px' }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
      </div>
    </div>
  );
}

export default Chat;
