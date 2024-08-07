import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Login() {

  const location = useLocation();

  return (
    // Background div
    <div className='d-flex' style={{ minHeight: '100vh', backgroundColor: '#1a191e' }}>

      <Container fluid>

      {/* Form div */}
      <div style={{ backgroundColor: '#151419', padding: '30px', borderRadius: '15px', maxWidth: '400px' }}>

        <h2 className='text-center mb-4'>Login</h2>
        <Form>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Link to="/Dashboard">
            <Button type='submit' className='w-100'>Submit</Button>
          </Link>
        </Form>
        <div className='text-center mt-3'>
          Forgot password?
        </div>
        <div className='text-center mt-3'>
          <Link to="/Signup">
            Don't have an account? Sign Up
          </Link>
        </div>

      </div>

      </Container>

    </div>
  )
}

export default Login