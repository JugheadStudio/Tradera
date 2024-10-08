import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext'; // Import the hook
import { ReactComponent as NavLogo } from '../assets/logo.svg';
import profile from '../assets/profile.png';

const Sidebar = () => {
  const { userId, username, role } = useUser(); // Access the userId, username, and role from the context
  const { setUserId, setUsername } = useUser(); // Access setUserId to nullify on logout
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSignOut = async () => {
    try {
        // Make the API call to log out
        const response = await fetch('http://localhost:5219/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userId), // Send the userId to the backend
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Clear user context or any other global state or storage mechanism you use
        setUserId(null);
        setUsername(null);
        
        // Optional: Clear any local storage or session storage if used
        localStorage.removeItem('userToken'); // Adjust based on your actual storage key

        // Navigate to the login page or home page
        navigate('/');
        
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Logout error:', error);
        // Optionally, you can show an error message to the user
    }
  };

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
            {username || 'Guest'}
          </div>
          <div className='usercontainder-usertype'>
            {role}
          </div>
        </div>
      </div>

      <div>
        <Button variant='signout' onClick={handleSignOut}>Sign Out</Button>
      </div>

      <div className='sidenav-headings'>
        MENU
      </div>

      <Nav className="flex-column">
        <Nav.Link as={Link} to="/Home" className={location.pathname === '/Home' ? 'active' : ''}>
          <i className="fas fa-home"></i> Home
        </Nav.Link>
        <Nav.Link as={Link} to="/Dashboard" className={location.pathname === '/Dashboard' ? 'active' : ''}>
          <i className="fas fa-user"></i> My Account
        </Nav.Link>
      </Nav>

      {role === 'Admin' && (
        <>
          <div className='sidenav-headings'>
            ADMIN
          </div>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/AdminDashboard" className={location.pathname === '/AdminDashboard' ? 'active' : ''}>
              <i className="fas fa-user-shield"></i> Admin Dashboard
            </Nav.Link>
          </Nav>
        </>
      )}
    </div>
  );
}

export default Sidebar;
