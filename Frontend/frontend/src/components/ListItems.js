import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="/dhome">
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/dchat">
      <ListItemText primary="Chat List" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/dchat">
      <ListItemText primary="Chat" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/dprofile">
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);