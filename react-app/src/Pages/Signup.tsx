import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row, Form, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserId } = useUser(); // Get setUserId from context
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Use an array to handle individual OTP digits
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [storedOtp, setStoredOtp] = useState(''); // Store OTP temporarily

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Step 1: Initiate Signup and Show OTP Modal
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5219/api/user/initiate-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        const data = await response.json();
        setStoredOtp(data.otpCode); // Store OTP code
        setShowOtpModal(true); // Show OTP modal
      } else {
        throw new Error('Signup initiation failed');
      }
    } catch (error) {
      console.error('Error during signup initiation:', error);
      alert('Error during signup initiation, check console for details');
    }
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  // Step 2: Verify OTP and Complete Signup
  const handleOtpSubmit = async () => {
    const otpValue = otp.join(''); // Join the OTP array to form a complete string
    try {
      const response = await fetch('http://localhost:5219/api/user/verify-otp-and-create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          otp: otpValue, // The complete OTP code
          storedOtp: storedOtp // The OTP sent to the user's email
        })
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.user_id); // Set user ID in context
        // alert('OTP verified and user created successfully!');
        setShowOtpModal(false);
        navigate('/dashboard'); // Navigate to the dashboard after successful verification
      } else {
        throw new Error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('Error during OTP verification, check console for details');
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

      {/* Custom OTP Modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">Enter your 6 digit OTP code in order to reset.</p>
          <div className="otp-input-container">
            {otp.map((data, index) => {
              return (
                <input
                  className="otp-input"
                  type="text"
                  maxLength={1} // Set maxLength as a number
                  key={index}
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>
          <Button variant="primary" className="w-100 mt-4" onClick={handleOtpSubmit}>
            Verify OTP
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Signup;
