import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../app/App";
import SubApp from "../app/sub_app";

import About from "../pages/about";
import Contact from "../pages/contact";

import Dashboard from "../pages/dashboard";
import MovieAnalysis from "../pages/movie-analysis";
import ActorMarketingAnalysis from "../pages/actor-marketing-analysis";
import DirectorHome from "../pages/DirectorHome";
import DirectorChat from "../pages/DirectorChat";
import DirectorProfile from "../pages/DirectorProfile";
import DirectorRequest from "../pages/DirectorRequest";
import Register from "../user/Register"
import Login from "../user/Login"
import MovieReview from "../pages/MovieReview";

function PageRoutes() {
  return (
    <Router>
      <Routes>
        {/* Unprotected Routes */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* Unprotected Routes */}
        {/* Protected Routes */}
        {/* <Route path="/" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path="/home" element={<SubApp />}>
            <Route path="/home/dashboard" element={<DirectorHome />} />
            <Route path="/home/movie-analysis" element={<MovieAnalysis />} />
            <Route
              path="/home/actor-marketing-analysis"
              element={<ActorMarketingAnalysis />}
            />
            <Route path="/home/dprofile" element={<DirectorProfile />} />
            <Route path="/home/dchat" element={<DirectorChat />} />
            <Route path="/home/drequest" element={<DirectorRequest />} />
            <Route path="/home/move-review" element={<MovieReview />} />
          </Route>
          <Route path="/about" element={<Contact />} />
          <Route path="/contact" element={<About />} />
          
        </Route>
        {/* Protected Routes */}
      </Routes>
    </Router>
  );
}

export default PageRoutes;
