import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/director.css"
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
import { TextField } from '@mui/material';
// import background_image from '../../temp_images/page_background.png'


export default function DirectorHome() {
  const email = localStorage.getItem("user email");
  const name = localStorage.getItem("user name");

  const backendBaseUrl = 'http://localhost:5000';

  const [emotions, setEmotions] = useState([]);
  const [loadedImage, setLoadedImage] = useState(null);
  const [userDescription, setUserDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate('/home/dchat'); // Replace '/chat' with the actual URL of your chat page
  };

  const navigateToRequest = () => {
    navigate('/home/drequest'); // Replace '/request' with the actual URL of your request page
  };

  const navigateToProfile = () => {
    navigate('/home/dprofile'); // Replace '/profile' with the actual URL of your profile page
  };

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

  // Function to handle changes in the search input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter emotions based on search query
  const filteredEmotions = emotions.filter((emotion) => {
    const emotionName = emotion.emotion.toLowerCase();
    return emotionName.includes(searchQuery.toLowerCase());
  });

  // Sort emotions by rate in descending order
  filteredEmotions.sort((a, b) => b.score - a.score);

  return (
    <div className='director-container'>
      <br />
        <Container sx={{ py: 8 }} width={'100%'} style={{ position: 'relative', zIndex: 1 }}>
        <TextField
        label="Search Emotions"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />

      <Grid container spacing={1}>
        {filteredEmotions.map((emotion) => (
              <Grid key={emotion._id} xs={12} sm={6} md={3.5} style={{ marginLeft: '40px', marginTop: '20px' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', zIndex: 1 }}>
                  <CardMedia
                    component="img"
                    src={require(`../../../../Emotions Identification System/ActorImage/${emotion.image_path}`)}
                    sx={{width:"100%", height:250}}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" >
                      {emotion.emotion}
                    </Typography>
                    <Typography variant="h5" component="h2">
                    Rate: {emotion.score.toFixed(2)}%
                    </Typography>
                    <Typography>
                      {emotion.user_name}
                    </Typography>
                    <Typography>
                      {emotion.user_description}
                    </Typography>
                  </CardContent>
                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ backgroundColor: '#483485', marginBottom: '10px' }}
                      onClick={() => handleRequest(emotion.user_email, emotion.user_name)}
                    >
                      Request
                    </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </div>
  );
}





