import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import DirectorHome from '../director pages/DirectorHome/DirectorHome';
import DirectorChat from '../director pages/DirectorChat/DirectorChat';
import DirectorRequest from '../director pages/DirectorRequest/DirectorRequest';
import DirectorProfile from '../director pages/DirectorProfile/DirectorProfile';

import { Link as RouterLink, useParams, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { mainListItems} from './ListItems';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const { section } = useParams();

  let ContentComponent;

  if (section === 'dchat') {
    ContentComponent = DirectorChat;
  } else if (section === 'dprofile') {
    ContentComponent = DirectorProfile;
  } else if (section === 'drequest') {
    ContentComponent = DirectorRequest;
  } else {
    // Default to DirectorHome if no specific section is selected
    ContentComponent = DirectorProfile;
  }

  console.log(ContentComponent);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <Link
            component={RouterLink}
            to="/dhome"
            className={section === 'dhome' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link
            component={RouterLink}
            to="/dchat"
            className={section === 'dchat' ? 'active' : ''}
          >
            Chat List
          </Link>
          <Link
            component={RouterLink}
            to="/dchat"
            className={section === 'dchat' ? 'active' : ''}
          >
            Chat
          </Link>
          <Link
            component={RouterLink}
            to="/dprofile"
            className={section === 'dprofile' ? 'active' : ''}
          >
            Profile
          </Link>
        </List>
        </Drawer>
        <Container>
        {/* Render the appropriate component based on the 'section' parameter */}
        <ContentComponent />
        {/* ... other components ... */}
      </Container>
        
      </Box>
    </ThemeProvider>
  );
}