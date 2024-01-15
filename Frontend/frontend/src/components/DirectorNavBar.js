import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import img_logo from '../logo/logo.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const drawerWidth = 240;

const useStyles = makeStyles({
  appBar: {
    zIndex: 1201,
    backgroundColor: 'white', // Set the background color to white
  },
  navLinkContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '20px',
  },
  navLink: {
    color: '#000',
    textDecoration: 'none',
    margin: '10px 0',
    padding: '8px 16px',
    borderRadius: '8px',
    width:'170px',
    transition: 'background-color 0.3s ease-in-out',
    '&.active': {
      backgroundColor: '#483485',
      color: '#fff',
    },
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  navContainer: {
    marginTop: '15px',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '8px',
  },
});

export default function DirectorNavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLoginClick = () => {
    navigate(`/login`);
  };

  return (
    <div>
      <AppBar className={classes.appBar} position="fixed" style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <img src={img_logo}
            alt="Logo"
            style={{ cursor: 'pointer' }}
            onClick={handleDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Button onClick={handleDrawerToggle}>Close</Button>
        </div>
        <div className={classes.navLinkContainer}>
          <NavLink to="/dhome" className={classes.navLink} activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/drequest" className={classes.navLink} activeClassName="active">
            Chat List
          </NavLink>
          <NavLink to="/dchat" className={classes.navLink} activeClassName="active">
            Chat
          </NavLink>
          <NavLink to="/dprofile" className={classes.navLink} activeClassName="active">
            Profile
          </NavLink>
           <NavLink to="/film-marketing" className={classes.navLink} activeClassName="active">
            Film Marketing
          </NavLink>
          {/* <Button
            variant="outlined"
            onClick={handleLoginClick}
            style={{ margin: '10px 0', padding: '8px 16px', borderRadius: '8px' }}
          >
            Login
          </Button> */}
        </div>
      </Drawer>
      <main>
        <div style={{ marginTop: '64px' }}>
          {/* Your main content goes here */}
        </div>
      </main>
    </div>
  );
}
