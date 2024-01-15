import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import img_logo from '../logo/logo.png';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '', // Set the background color to 'white'
  },
  navLink: {
    marginRight: '25px',
    color: '#000',
    textDecoration: 'none',
    '&.active': {
      fontWeight: 'bold',
      color: '#483485',
    },
  },
  navContainer: {
    marginLeft: 'auto',
    marginRight: '100px',
  },
});



export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate(`/login`);
  };

  return (
    <div>
      <AppBar className={classes.appBar} style={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <img src={img_logo} alt="Logo" />
          <div className={classes.navContainer}>
            <nav>
              <NavLink to="/home" className={classes.navLink} activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/request" className={classes.navLink} activeClassName="active">
                Request
              </NavLink>
              <NavLink to="/chat" className={classes.navLink} activeClassName="active">
                Chat
              </NavLink>
              <NavLink to="/profile" className={classes.navLink} activeClassName="active">
                Profile
              </NavLink>
              <Button href="#" variant="outlined"
              onClick={() => handleLoginClick()}>
              Login
            </Button>
            </nav>          
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
