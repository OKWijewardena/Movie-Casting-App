import React, { useState } from 'react';
import background from './Register.png';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';


export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('director');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const userData = {
      name: name,
      email: email,
      category: category,
      password: password
    };

    axios.post('http://localhost:5000/api/register', userData)
      .then((response) => {
        console.log(response.data); // Optionally, you can handle success response
        // Redirect to login page after successful registration
        // Replace '/login' with the actual URL of your login page
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        // Optionally, you can show an error message to the user
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
          <h2>Register</h2>
          <p>Sign up as a new user.</p>
        </div>

        <TextField
      label="Name"
      fullWidth
      margin="normal"
      InputProps={{ style: { borderColor: '#483485' } }}
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <TextField
      label="Email"
      fullWidth
      margin="normal"
      InputProps={{ style: { borderColor: '#483485' } }}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <FormControl fullWidth margin="normal">
      <InputLabel style={{ color: '#483485' }}>Category</InputLabel>
      <Select
        label="Category"
        style={{ color: '#483485' }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="director">Director</MenuItem>
        <MenuItem value="actor">Actor</MenuItem>
      </Select>
    </FormControl>

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
      onClick={handleRegister}
    >
      Register
    </Button>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <p>If you already registered. Please <NavLink to="/login">login</NavLink></p>
    </div>

      </Box>
    </div>
  );
}
