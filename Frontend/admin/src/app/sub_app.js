import React, { useState,useEffect } from 'react';
import "./App.css";
import { Outlet } from "react-router-dom";
import SideNavigation from "../components/side-navigation";
import axios from 'axios';

function SubApp() {
  const backendBaseUrl = 'http://localhost:5000';

  const [email, setEmail] = useState(''); // Fix the useState usage here
  const [userName, setUserName] = useState('');
  

  useEffect(() => {
    // Fetch user requests based on email
    axios.get(`${backendBaseUrl}/api/user/director@gmail.com`)
      .then((response) => {
        const name = response.data;
        console.log(name);
        setUserName(name);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  }, [email]);

  console.log(userName);
  console.log(email);
  localStorage.setItem("user name", userName);

  return (
    <div className="application-sidenav-body">
      <SideNavigation />
      <Outlet />
    </div>
  );
}

export default SubApp