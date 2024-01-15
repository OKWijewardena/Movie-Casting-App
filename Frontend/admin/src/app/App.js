import React, { useState,useEffect } from 'react';
import "./App.css";
import { Outlet } from "react-router-dom";
import axios from 'axios';
 
import TopNavigation from "../components/top-navigation";

function App() {

  localStorage.setItem("user email", "director@gmail.com");

  // const backendBaseUrl = 'http://localhost:5000';

  // const [email, setEmail] = useState(''); // Fix the useState usage here
  // const [userName, setUserName] = useState('');

  // localStorage.setItem("user email", email);
  

  // useEffect(() => {
  //   // Fetch user requests based on email
  //   axios.get(`${backendBaseUrl}/api/user/${email}`)
  //     .then((response) => {
  //       const name = response.data;
  //       console.log(name);
  //       setUserName(name);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user name:', error);
  //     });
  // }, [email]);

  // console.log(userName);
  // console.log(email);
  // localStorage.setItem("user name", userName);
  return (
    <div className="application-container">
      <TopNavigation />
      <Outlet />
    </div>
  );
}

export default App;
