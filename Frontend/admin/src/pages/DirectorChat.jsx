// DirectorChat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Container, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import "../css/director.css"

const API_BASE_URL = 'http://localhost:5000/api/messages';

export default function DirectorChat() {
  
  const [messages, setMessages] = useState([]);
  const [message, setmessage] = useState('');

  const actor_email = localStorage.getItem('actor email');
  console.log(actor_email);
  const director_email = localStorage.getItem('user email');
  console.log(director_email);
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
    <div className='director-container'>
      <br />
      <br />
      <br />
      <Container maxWidth="sm">
        <Box mt={3} p={3} component={Paper} elevation={3}>
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
  );
}

