// src/components/Sidebar.js
import React from 'react';
import { Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as NavLogo } from '../assets/logo.svg';
import profile from '../assets/profile.png';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className='sidenav'>
          <div className='w-100'>
              <div className='align-items-center w-100 text-center'>
                  <NavLogo id='mainLogo' alt='Tradera Logo' />
              </div>
          </div>

          <div className='usercontainder'>
              <img id='profileLogo' src={profile} alt='Profile' />
              <div className='usercontainder-info'>
                  <div className='usercontainder-username'>
                      Dave
                  </div>
                  <div className='usercontainder-usertype'>
                      Traveler
                  </div>
              </div>
          </div>

          <div className='sidenav-headings'>
              MENU
          </div>

          <Nav className="flex-column">
              <Nav.Link as={Link} to="/Home" className={location.pathname === '/Home' ? 'active' : ''}>
                  <i className="fas fa-home"></i> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Details" className={location.pathname === '/Details' ? 'active' : ''}>
                  <i className="fas fa-info-circle"></i> Details
              </Nav.Link>
              <Nav.Link as={Link} to="/Dashboard" className={location.pathname === '/Dashboard' ? 'active' : ''}>
                  <i className="fas fa-tachometer-alt"></i> Dashboard
              </Nav.Link>
          </Nav>

          <div className='sidenav-headings'>
              ADMIN
          </div>

          <Nav className="flex-column">
              <Nav.Link as={Link} to="/AdminDashboard" className={location.pathname === '/AdminDashboard' ? 'active' : ''}>
                  <i className="fas fa-user-shield"></i> AdminDashboard
              </Nav.Link>
          </Nav>
        </div>
    );
}

export default Sidebar;
