import React, { useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault(); // Prevents the default form submission behavior
    try {
      const response = await fetch('http://localhost:5219/api/user/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setUserId(data.user_id);
      navigate('/Dashboard');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
        alert('Login failed: ' + error.message);
      } else {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container fluid>
      <Row className='justify-content-around h100'>
        <Col xs={3} className='login-form-container-div'>
          <h2 className='text-center mb-4 login-Heading'>Log in</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group mb-3'>
              <label htmlFor='email' className='input-label'>Email address</label>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='password' className='input-label'>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='form-submit-button w-100'>
              Submit
            </button>
          </form>
          <div className='text-center mt-3 signup-btn'>
            <p>Don't have an account?</p>
            <Nav.Link as={Link} to="/Signup">
              Sign up
            </Nav.Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
