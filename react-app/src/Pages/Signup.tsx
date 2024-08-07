import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Signup() {

  const location = useLocation();

  return (
    <div className='auth-container'>

      <div style={{ backgroundColor: '#151419', paddingLeft: '770px', paddingRight: '770px', paddingTop: '220px', paddingBottom: '220px', borderRadius: '15px' }}>

        <div className='login-form-container-div' style={{ backgroundColor: '#1a191e', padding: '30px', borderRadius: '15px' }}>

          <h2 className='text-center mb-4 login-text'>Sign up</h2>

            <form>
              <div className='form-group mb-3'>
                <label htmlFor='username' className='login-text'>Username</label>
                <input type='text' className='form-control' id='username' placeholder='Enter username' />
              </div>

              <div className='form-group mb-3'>
                <label htmlFor='email' className='login-text'>Email address</label>
                <input type='email' className='form-control' id='email' placeholder='Enter email' />
              </div>

              <div className='form-group mb-3'>
                <label htmlFor='password' className='login-text'>Password</label>
                <input type='password' className='form-control' id='password' placeholder='Enter password' />
              </div>
              
              <Nav.Link as={Link} to="/Dashboard" className={location.pathname === '/' ? 'active' : ''}>
                <div className='form-submit-button'>
                  Submit
                </div>
              </Nav.Link>
            </form>

            <div className='text-center mt-3 login-text'>
              <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
                Already have an account?
                <br></br>
                Log in
              </Nav.Link>
            </div>
          </div>

      </div>
      
    </div>
  )
}

export default Signup