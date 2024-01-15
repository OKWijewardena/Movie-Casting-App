import React from "react";
import "../css/top-navigation.css";
import Logo from "../images/logo2.png";
import User from "../images/user.jpg";
import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
// import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";

import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

import { useNavigate } from 'react-router-dom';

function TopNavigation() {

  localStorage.setItem("user email", "director@gmail.com");
  
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

  return (
    <div className="top-nav-container">
      <div className="top-nav-logo-container">
        <NavLink to="/home">
          <img src={Logo} alt="Logo" width="150px" />
        </NavLink>
      </div>
      <div className="top-nav-links-container">
        <NavLink to="/home" className="top-nav-link-text">
          <div className="top-nav-text-wrapper">Home</div>
        </NavLink>
        <NavLink to="/about" className="top-nav-link-text">
          <div className="top-nav-text-wrapper">About</div>
        </NavLink>
        <NavLink to="/contact" className="top-nav-link-text">
          <div className="top-nav-text-wrapper">Contact</div>
        </NavLink>
      </div>
      <div className="top-nav-search-container">
        <div className="top-nav-search-container-wrapper">
          <SearchIcon sx={{ color: "white" }} />
          <input type="text" placeholder="Search" className="top-nav-search" />
        </div>
        <SpeakerNotesIcon sx={{color:"white"}} style={{cursor:"pointer"}} onClick={navigateToRequest}/>
        <img src={User} alt="Logo" width="40px" height="40px" className="profile-picture" onClick={navigateToProfile}/>
      </div>
    </div>
  );
}

export default TopNavigation;
