import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import background_image from '../../temp_images/page_background.png'

// import Dashboard from '../../components/Dashboard';

import DirectorNavBar from '../../components/DirectorNavBar';

export default function DirectorHome() {
  const email = localStorage.getItem("user email");
  const name = localStorage.getItem("user name");

  const backendBaseUrl = 'http://localhost:5000';

  const [emotions, setEmotions] = useState([]);
  const [loadedImage, setLoadedImage] = useState(null);
  const [userDescription, setUserDescription] = useState('');

  useEffect(() => {
    // Fetch all emotions data from your backend API
    axios.get(`${backendBaseUrl}/api/emotions`)
      .then((response) => {
        setEmotions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching emotions:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch user description based on email
    axios.get(`${backendBaseUrl}/api/description/${email}`)
      .then((response) => {
        const description = response.data.description;
        setUserDescription(description);
      })
      .catch((error) => {
        console.error('Error fetching user description:', error);
      });
  }, [email]); // Include 'email' in the dependency array to trigger the request whenever the email changes

  const handleRequest = (actorEmail,actorName) => {
    const requestData = {
      actor_email: actorEmail,
      actor_name: actorName,
      director_email: email,
      director_name: name,
      director_description: userDescription,
    };

    axios.post(`${backendBaseUrl}/api/request`, requestData)
      .then((response) => {
        console.log(response.data);
        alert("Request sent successfully");
      })
      .catch((error) => {
        console.error('Error sending request:', error);
      });
  };

  return (
    <div>
      <DirectorNavBar />
      <br />
        <Container sx={{ py: 8 }} width={'100%'} style={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={1}>
            {emotions.map((emotion) => (
              <Grid key={emotion._id} xs={12} sm={6} md={3.5} style={{ marginLeft: '40px', marginTop: '20px' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', zIndex: 1 }}>
                  <CardMedia
                    component="img"
                    src={require(`../../../../../Emotions Identification System/ActorImage/${emotion.image_path}`)}
                    sx={{width:"100%", height:250}}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {emotion.emotion}
                    </Typography>
                    <Typography>
                      {emotion.score}%
                    </Typography>
                    <Typography>
                      {emotion.user_name}
                    </Typography>
                    <Typography>
                      {emotion.user_description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ backgroundColor: '#483485', marginTop: '10px' }}
                      onClick={() => handleRequest(emotion.user_email, emotion.user_name)}
                    >
                      Request
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      {/* Display the user description */}
      <Typography>
        User Description: {userDescription}
      </Typography>
    </div>
  );
}





