import React, { useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

function Signup() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5219/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        const data = await response.json();
        alert('Signup successful!');
        navigate('/dashboard'); // Using navigate instead of history.push
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error during signup, check console for details');
    }
  };

  return (
    <Container fluid>
      <Row className='justify-content-around h100'>
        <Col xs={3} className='login-form-container-div'>
          <h2 className='text-center mb-4 login-Heading'>Sign up</h2>
          <form onSubmit={handleSignup}>
            <div className='form-group mb-3'>
              <label htmlFor='username' className='input-label'>Username</label>
              <input type='text' className='form-control' id='username' name='username' placeholder='Enter username' value={userData.username} onChange={handleInputChange} required />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='email' className='input-label'>Email address</label>
              <input type='email' className='form-control' id='email' name='email' placeholder='Enter email' value={userData.email} onChange={handleInputChange} required />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='password' className='input-label'>Password</label>
              <input type='password' className='form-control' id='password' name='password' placeholder='Enter password' value={userData.password} onChange={handleInputChange} required />
            </div>
            <button type='submit' className='form-submit-button w-100'>Submit</button>
          </form>
          <div className='text-center mt-3 signup-btn'>
            <p>Already have an account?</p>
            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>Log in</Nav.Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
