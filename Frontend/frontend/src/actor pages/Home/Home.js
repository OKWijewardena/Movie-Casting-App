import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import NavBar from "../../components/NavBar"



export default function Home() {

  const backendBaseUrl = 'http://localhost:5000';

  const [search,setsearch] = useState("");

  const [emotions, setEmotions] = useState([
    {
      image_path: "",
      emotion:"",
      score:"",
      user_email:""
    }
  ]);
  const [loadedImage, setLoadedImage] = useState(null);

  const email = localStorage.getItem("user email");

  useEffect(() => {
    // Fetch all emotions data from your backend API
    axios.get(`${backendBaseUrl}/api/emotions`)
      .then((response) => {
        setEmotions(response.data);
        console.log(response.data);
        alert("image loaded successfully")
      })
      .catch((error) => {
        console.error('Error fetching emotions:', error);
      });
  }, []);

  

    const navigate = useNavigate();
  
    const navigateToChat = () => {
      navigate('/chat'); // Replace '/chat' with the actual URL of your chat page
    };
  
    const navigateToRequest = () => {
      navigate('/request'); // Replace '/request' with the actual URL of your request page
    };
  
    const navigateToProfile = () => {
      navigate('/profile'); // Replace '/profile' with the actual URL of your profile page
    };
  
    return (
      <div>
        <NavBar />
  
        <br />
        <br />
        <br />
        <br />
        <div>
          <Container sx={{ py: 8 }} width={'100%'}>
            {/* End hero unit */}
            <Grid container spacing={1}>
              <Grid
                xs={12}
                sm={6}
                md={3.5}
                style={{ marginLeft: '40px', marginTop: '20px' }}
                onClick={navigateToChat}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{alignItems:'center'}}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" fontSize={35} color="#483485">
                      Chat
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ flexGrow: 1 }} style={{marginTop:'-15px'}}>
                    <Typography gutterBottom variant="h3" component="h4" fontSize={11} color="#483485" >
                    Chat with your director and select to the movie.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
  
              <Grid
                xs={12}
                sm={6}
                md={3.5}
                style={{ marginLeft: '40px', marginTop: '20px' }}
                onClick={navigateToRequest}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{alignItems:'center'}} >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" fontSize={35} color="#483485">
                      Request
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ flexGrow: 1 }} style={{marginTop:'-15px'}}>
                    <Typography gutterBottom variant="h3" component="h4" fontSize={11} color="#483485" >
                    See requests coming from directors.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
  
              <Grid
                xs={12}
                sm={6}
                md={3.5}
                style={{ marginLeft: '40px', marginTop: '20px' }}
                onClick={navigateToProfile}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{alignItems:'center'}}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" fontSize={35} color="#483485" >
                      Profile
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ flexGrow: 1 }} style={{marginTop:'-15px'}}>
                    <Typography gutterBottom variant="h3" component="h4" fontSize={11} color="#483485" >
                    you can upload your face images to testing for the directors
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
            <div style={{marginTop:'-55px'}}>
            <Container sx={{ py: 8 }} width={'100%'} style={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={1}>
            {emotions
              .filter((emotion) => emotion.user_email === email) // Filter the emotions data by user_email
              .map((emotion) => (
                <Grid key={emotion._id} xs={12} sm={6} md={3.5} style={{ marginLeft: '40px', marginTop: '20px' }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img" // Use "img" instead of "div"
                      src={require(`../../../../../Emotions Identification System/ActorImage/${emotion.image_path}`)} // Use the provided image URL
                      sx={{width:"100%", height:250}}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2" fontSize={25}>
                        {emotion.emotion}
                      </Typography>
                      <Typography variant="h5" component="h2" fontSize={15}>
                        Rate: {emotion.score.toFixed(2)}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              </Grid>
              </Container>
            </div>

        </div>
    )
}