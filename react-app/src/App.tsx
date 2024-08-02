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
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import Details from './Pages/Details';
import Home from './Pages/Home';



function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Details" element={<Details />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
