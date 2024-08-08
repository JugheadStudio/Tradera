import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Signup() {

  const location = useLocation();

  return (
      <Container fluid>

        <Row className='justify-content-around h100'>
          <Col xs={3} className='login-form-container-div'>

            <h2 className='text-center mb-4 login-Heading'>Sign up</h2>

              <form>
                <div className='form-group mb-3'>
                  <label htmlFor='username' className='input-label'>Username</label>
                  <input type='text' className='form-control' id='username' placeholder='Enter username' />
                </div>

                <div className='form-group mb-3'>
                  <label htmlFor='email' className='input-label'>Email address</label>
                  <input type='email' className='form-control' id='email' placeholder='Enter email' />
                </div>

                <div className='form-group mb-3'>
                  <label htmlFor='password' className='input-label'>Password</label>
                  <input type='password' className='form-control' id='password' placeholder='Enter password' />
                </div>
                
                <Nav.Link as={Link} to="/Dashboard" className={location.pathname === '/' ? 'active' : ''}>
                  <div className='form-submit-button'>
                    Submit
                  </div>
                </Nav.Link>
              </form>

              <div className='text-center mt-3 signup-btn'>
                  <p>Already have an account?</p>
                <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Log in
                </Nav.Link>
              </div>
            </Col>
        </Row>

      </Container>
  )
}

export default Signup