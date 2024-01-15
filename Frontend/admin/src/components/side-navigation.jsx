import React from "react";
import "../css/side-navigation.css";
import { NavLink } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

function SideNavigation() {
  return (
    <div className="side-nav-container">
      <NavLink to="/home/dashboard" className="side-nav-link">
        <div className="side-nav-link-wrapper">
          <DashboardOutlinedIcon sx={{ marginRight: "15px" }} />
          Movie Casting
        </div>
      </NavLink>
      <NavLink to="/home/movie-analysis" className="side-nav-link">
        <div className="side-nav-link-wrapper">
          <MovieOutlinedIcon sx={{ marginRight: "15px" }} />
          Movie Analysis
        </div>
      </NavLink>
      <NavLink to="/home/actor-marketing-analysis" className="side-nav-link">
        <div className="side-nav-link-wrapper">
          <MovieOutlinedIcon sx={{ marginRight: "15px" }} />
          Actor & Marketing Analysis
        </div>
      </NavLink>
      <NavLink to="/home/pose-identify" className="side-nav-link">
        <div className="side-nav-link-wrapper">
          <MovieOutlinedIcon sx={{ marginRight: "15px" }} />
          Pose Identify
        </div>
      </NavLink>
      <NavLink to="/home/pose-identify" className="side-nav-link">
        <div className="side-nav-link-wrapper">
          <MovieOutlinedIcon sx={{ marginRight: "15px" }} />
          Actor Categories
        </div>
      </NavLink>
      <NavLink to="/home/move-review" className="side-nav-link">
        <div className="side-nav-link-wrapper">
          <MovieOutlinedIcon sx={{ marginRight: "15px" }} />
          Movie Review
        </div>
      </NavLink>
      
    </div>
  );
}

export default SideNavigation;
