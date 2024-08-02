// src/components/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import navlogo from '../assets/navlogo.png';
import profile from '../assets/profile.png';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div expand='xl' className='sidenav' style={{ width: '250px' }}>
            <div className='w-100'>
                <div className='align-items-center w-100 text-center'>
                    <img id='mainLogo' src={navlogo} alt='Tradera Logo' />
                    Tradera
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
                <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
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
                ADMINS
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
