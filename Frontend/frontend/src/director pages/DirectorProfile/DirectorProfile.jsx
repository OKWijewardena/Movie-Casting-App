import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import DirectorNavBar from '../../components/DirectorNavBar';
import background_image from '../../temp_images/page_background.png'


export default function DirectorProfile() {

  const userEmail = localStorage.getItem("user email");
  console.log(userEmail); // Make sure this prints the correct email

  const [description, setDescription] = useState('');

  const handleDescription = () => {
    const userDescription = {
      demail: userEmail, // Use userEmail instead of email
      description: description,
    };

    axios.post('http://localhost:5000/api/description', userDescription)
      .then((response) => {
        console.log(response.data);
        alert("Description added successfully");
      })
      .catch((error) => {
        console.error('Error adding description:', error);
      });
  };
  

  return (
    <div>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <img
          src={background_image}
          alt=""
          style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
        <DirectorNavBar/>

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
          <h2>tell us about you</h2>
        </div>

    {/* <TextField
      label="Email"
      fullWidth
      margin="normal"
      InputProps={{ style: { borderColor: '#483485' } }}
      value={user_email}
      onChange={(e) => setemail(e.target.value)}
      disabled 
    /> */}

<TextField
      label="Discription"
      fullWidth
      margin="normal"
      InputProps={{ style: { borderColor: '#483485' } }}
      onChange={(e) => setDescription(e.target.value)}
    />

        <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ backgroundColor: '#483485', marginTop: '10px' }}
      onClick={handleDescription}
    >
      Submit
    </Button>

      </Box>
    </div>
    </div>
  );
}