import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//Pages
import AdminDashboard from './Pages/AdminDashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Details from './Pages/Details';
import Home from './Pages/Home';



function App() {
  return (
    <Router>
      <Routes>
        {/* checks if the path is to the auth page, if its not -> add the sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <div className="d-flex">
              <Sidebar />
              <div className="flex-grow-1 p-3">
                <Routes>
                  <Route path="/Details" element={<Details />} />
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/Home" element={<Home />} />
                  <Route path="/AdminDashboard" element={<AdminDashboard />} />
                  <Route path="/Signup" element={<Signup />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
