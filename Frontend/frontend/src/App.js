import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './actor pages/Profile/Profile';
import Home from './actor pages/Home/Home';
import Request from './actor pages/Request/Request';
import Chat from './actor pages/Chat/Chat';
import Register from './user/Register';
import Login from './user/Login';
import DirectorHome from './director pages/DirectorHome/DirectorHome';
import DirectorProfile from './director pages/DirectorProfile/DirectorProfile';
import DirectorChat from './director pages/DirectorChat/DirectorChat';
import DirectorRequest from './director pages/DirectorRequest/DirectorRequest';
import Dashboard from './components/Dashboard';
import FilmMarketing from './director pages/Film Marketing/Film-Marketing';

function App() {

  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/request" element={<Request />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/dhome" element={<DirectorHome />} />
            <Route path="/dprofile" element={<DirectorProfile />} />
            <Route path="/dchat" element={<DirectorChat />} />
            <Route path="/drequest" element={<DirectorRequest />} />
            <Route path="/film-marketing" element={<FilmMarketing />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
