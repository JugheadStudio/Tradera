import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// Components

//Pages
import AdminDashboard from './Pages/AdminDashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Details from './Pages/Details';
import Home from './Pages/Home';
import Sidebar from './Components/Sidebar';
import { UserProvider } from './Contexts/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Container fluid>
          <Row>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="*" element={<AuthenticatedRoutes />} />
            </Routes>
          </Row>
        </Container>
      </UserProvider>
    </Router>
  );
}

const AuthenticatedRoutes = () => (
  <>
    <Col xs={2}><Sidebar /></Col>
    <Col xs={10}>
      <Routes>
        <Route path="/Details" element={<Details />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Col>
  </>
);


export default App;
