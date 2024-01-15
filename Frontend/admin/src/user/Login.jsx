import React, { useState,useEffect } from 'react';
import background from './Register.png';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const backendBaseUrl = 'http://localhost:5000';

  const [email, setEmail] = useState(''); // Fix the useState usage here
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  localStorage.setItem("user email", email);
  

  useEffect(() => {
    // Fetch user requests based on email
    axios.get(`${backendBaseUrl}/api/user/${email}`)
      .then((response) => {
        const name = response.data;
        console.log(name);
        setUserName(name);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  }, [email]);

  console.log(userName);
  console.log(email);
  localStorage.setItem("user name", userName);

  const handleLogin = () => {
    axios.post(`${backendBaseUrl}/api/login`, { email, password })
      .then((response) => {
        // Assuming backend returns a success flag and user category
        const { success, category } = response.data;
  
        if (success) {
          // Redirect to the appropriate home page based on user category
          if (category === 'actor') {
            // Pass the user email as a URL parameter to the Actor Home page
            window.location.href = `/home`;
          } else if (category === 'director') {
            // Pass the user email as a URL parameter to the Director Home page
            window.location.href = `/home`;
          }
        } else {
          // Handle login error here (e.g., show error message)
        }
      })
      .catch((error) => {
        // Handle login error here (e.g., show error message)
        console.error('Login error:', error);
      });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <img src={background} alt="" style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />

      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '400px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2>Login</h2>
          <p>Login to your account.</p>
        </div>

        <TextField
      label="Email"
      fullWidth
      margin="normal"
      InputProps={{ style: { borderColor: '#483485' } }}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <TextField
      label="Password"
      type="password"
      fullWidth
      margin="normal"
      InputProps={{ style: { borderColor: '#483485' } }}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ backgroundColor: '#483485', marginTop: '10px' }}
      onClick={handleLogin}
    >
      Login
    </Button>

      </Box>
    </div>
  );
}
