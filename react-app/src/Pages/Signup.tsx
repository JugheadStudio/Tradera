import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Signup() {

  const location = useLocation();

  return (
    <div className='page-background d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', backgroundColor: '#1a191e' }}>
      <div className='auth-container'>

        <div style={{ backgroundColor: '#151419', paddingLeft: '770px', paddingRight: '770px', paddingTop: '220px', paddingBottom: '220px', borderRadius: '15px' }}>

          <div style={{ backgroundColor: '#1a191e', padding: '30px', borderRadius: '15px' }}>
            <h2 className='text-center mb-4'>Sign Up</h2>
              <form>
                <div className='form-group mb-3'>
                  <label htmlFor='email'>Email address</label>
                  <input type='email' className='form-control' id='email' placeholder='Enter email' />
                </div>
                <div className='form-group mb-3'>
                  <label htmlFor='password'>Password</label>
                  <input type='password' className='form-control' id='password' placeholder='Password' />
                </div>
                {/* <div className='form-group form-check mb-3'>
                  <input type='checkbox' className='form-check-input' id='rememberMe' />
                  <label className='form-check-label' htmlFor='rememberMe'>Remember me</label>
                </div> */}
                <Nav.Link as={Link} to="/Dashboard" className={location.pathname === '/' ? 'active' : ''}>
                  <button type='submit' className='btn btn-primary w-100'>Submit</button>
                </Nav.Link>
              </form>
              <div className='text-center mt-3'>
                <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Already have an account? Log In
                </Nav.Link>
              </div>
            </div>

        </div>
        
      </div>
    </div>
  )
}

export default Signup