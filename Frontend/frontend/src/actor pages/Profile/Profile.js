import { useState, useEffect } from "react";
import axios from "axios";
// import Loader from "../Loader/Loader";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import NavBar from "../../components/NavBar";
import background_image from '../../temp_images/page_background.png'


function Profile() {
  const [File, setFile] = useState();
  const [Actress, setActress] = useState([]);
  const [description, setDescription] = useState('');
  const [userDescription, setUserDescription] = useState('');

  const user_email = localStorage.getItem("user email");
  console.log(user_email);
  const user_name = localStorage.getItem("user name");

  useEffect(() => {
    // Fetch user description based on email
    axios.get(`http://localhost:5000/api/description/${user_email}`)
      .then((response) => {
        const description = response.data.description;
        setUserDescription(description);
      })
      .catch((error) => {
        console.error('Error fetching user description:', error);
      });
  }, [user_email]);

  const upload = () => {
    const Actor = new FormData();
    Actor.append("actor", File);
    Actor.append("user_email", user_email);
    Actor.append("user_name", user_name);
    Actor.append("user_description", userDescription);

    axios
      .post("http://localhost:5000/actor", Actor)
      .then((res) => {
        setActress(res.data);
        alert("Image uploaded successfully")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDescription = () => {
    const userDescription = {
      demail: user_email, // Use userEmail instead of email
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
    <>
      {/* <Loader /> */}
      <NavBar/>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <br />
      <br />
      <br />
      
        <img
          src={background_image}
          alt=""
          style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}  style={{ position: 'relative', zIndex: 1 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h5" align="center">
            Upload your image to detect emotion
          </Typography>
          <br/>
          <br/>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button variant="contained" onClick={upload}>Upload</Button >
        </Paper>

        <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '400px',
          position: 'absolute',
          marginTop:'150px',
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
      </Container>
        
      </div>
    </>
  );
}

export default Profile;
