import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo2.png';
import steve from '../assets/steve.png';
import netflix from '../assets/netflix.png';
import figma from '../assets/figma.png';
import google from '../assets/google.png';
import olivia from '../assets/olivia.png';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import DonutChart from '../Components/DonutChart';
import BarChart from '../Components/BarChart';

import { ReactComponent as EonsRed } from '../assets/eons-red.svg';
import { ReactComponent as EonsGreen } from '../assets/eons-green.svg';
import { ReactComponent as EonsBlack } from '../assets/eons-black.svg';

// Components

function Dashboard() {

  // functionality
  // currently logged in users id
  const [loggedUserId, setLoggedUserId] = useState(0);

  // currently logged in user's email or userid
  const [userInfo, setUserInfo] = useState(null);
  const [amountInWallet, setAmountInWallet] = useState(0);

  // Amount you would like to withdraw
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  // Fetch user data when the page loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/Account/' + loggedUserId);
        const userData = response.data;
        setUserInfo(userData);
        setAmountInWallet(userData.amount);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [loggedUserId]);


  const handleWithdraw = async () => {
    try {
      const response = await axios.post('/api/withdraw', {
        userId: loggedUserId,
        amount: withdrawAmount
      });
    } catch (error) {
      console.error('Error processing withdrawal:', error);
    }
  };


  //front end
  const [accountSettingsShow, setAccountSettingsShow] = useState(false);
  const [withdrawShow, setWithdrawShow] = useState(false);
  const [transferShow, setTransferShow] = useState(false);

  const handleAccountSettingsClose = () => setAccountSettingsShow(false);
  const handleAccountSettingsShow = () => setAccountSettingsShow(true);
  
  const handleWithdrawClose = () => setWithdrawShow(false);
  const handleWithdrawShow = () => setWithdrawShow(true);

  const handleTransferClose = () => setTransferShow(false);
  const handleTransferShow = () => setTransferShow(true);

  return (
    <div className='page-background'>
      <Container fluid>

        <Row>
          <Col className='border-container'>
            <p className='account-status'>Account Status: <span className='active'>Active</span></p>
            {/* <p className='account-status'>Account Status: <span className='frozen'>Frozen</span></p> */}
          </Col>
        </Row>

        <Row className='mt-20'>

          <Col xs={4}>
            <div className='column-title'>
              <span className='spesific'>Your</span> <span className='transactions'>Balance</span>
            </div>
            <div className='dashboard-balance-card'>
              <div className='cardcontainder'>
                <EonsBlack/>
                <div className='cardbalance'>
                  {amountInWallet}
                </div>
              </div>
              <div className='cardnumber'>
                xxx xxxx xxx 3421
              </div>
              <div className='expiresdatecontainder'>
                <p className="expire-text">Expires</p>
                <p className="expire-data">10/26</p>
              </div>
            </div>

            {/* Transactions begin here */}

            <div className='column-title mt-20'>
              <span className='spesific'>Recent</span> <span className='transactions'>Transactions</span>
            </div>
            <div className='transactions-row'>
              <img className='transactionsLogo' src={netflix} alt='Netflix logo' />
              <div className='transactions-info'>
                <div className='transactions-name'>
                  Netflix
                </div>
                <div className='transactions-usetype'>
                  Monthly Transaction
                </div>
              </div>
              <div className="transactions-count-red">
                <p>-25</p>
                <EonsRed/>
              </div>
            </div>

            <div className='transactions-row'>
              <img className='transactionsLogo' src={steve} alt='Profile' />
              <div className='transactions-info'>
                <div className='transactions-name'>
                  Steve
                </div>
                <div className='transactions-usetype'>
                  Transaction
                </div>
              </div>
              <div className="transactions-count-yellow">
                <p>+25</p>
                <EonsGreen/>
              </div>
            </div>

            <div className='transactions-row'>
              <img className='transactionsLogo' src={figma} alt='Figma logo' />
              <div className='transactions-info'>
                <div className='transactions-name'>
                  Figma
                </div>
                <div className='transactions-usetype'>
                  Monthly Transaction
                </div>
              </div>
              <div className="transactions-count-red">
                <p>-55</p>
                <EonsRed/>
              </div>
            </div>

            <div className='transactions-row'>
              <img className='transactionsLogo' src={google} alt='Google logo' />
              <div className='transactions-info'>
                <div className='transactions-name'>
                  Google
                </div>
                <div className='transactions-usetype'>
                  Monthly Transaction
                </div>
              </div>
              <div className="transactions-count-yellow">
                <p>+25</p>
                  <EonsGreen/>
              </div>
            </div>

            <div className='transactions-row'>
              <img className='transactionsLogo' src={olivia} alt='Profile' />
              <div className='transactions-info'>
                <div className='transactions-name'>
                  Olivia
                </div>
                <div className='transactions-usetype'>
                  Transaction
                </div>
              </div>
              <div className="transactions-count-red">
                <p>-525</p>
                <EonsRed/>
              </div>
            </div>
          </Col>

          {/* bar chart here */}
          <Col xs={5}>
            <div className='column-title'>
              <span className='spesific'>Your</span> <span className='transactions'>Status</span>
            </div>
            <div className='dasboard-status-chart'>
              <BarChart />
            </div>


            <div className='column-title mt-20'>
              <span className='spesific'>Pending</span> <span className='transactions'>Transactions</span>
            </div>

            <div className='transactions-row'>
              <img className='transactionsLogo' src={figma} alt='Figma logo' />
              <div className='transactions-info'>
                <div className='transactions-name'>Figma</div>
                <div className='transactions-usetype'>Monthly Transaction</div>
              </div>
              <div className='transactions-count-red'>
                <p>-55</p>
                <EonsRed/>
              </div>
            </div>

            <div className='transactions-row'>
              <img className='transactionsLogo' src={google} alt='Google logo' />
              <div className='transactions-info'>
                <div className='transactions-name'>Google</div>
                <div className='transactions-usetype'>Monthly Transaction</div>
              </div>
              <div className='transactions-count-yellow'>
                <p>+25</p>
                  <EonsGreen/>
              </div>
            </div>

            <div className='transactions-row'>
              <img className='transactionsLogo' src={olivia} alt='Profile' />
              <div className='transactions-info'>
                <div className='transactions-name'>Olivia</div>
                <div className='transactions-usetype'>Transaction</div>
              </div>
              <div className='transactions-count-red'>
                <p>-525</p>
                <EonsRed/>
              </div>
            </div>
          </Col>

          <Col xs={3}>

            <div className='column-title'>
              <span className='spesific'><br /></span>
            </div>

            <div className='action-container'>
              <Button variant="secondary" className='mb-3 w-100' onClick={handleWithdrawShow}><i className="fas fa-wallet"></i> Withdraw</Button>
              <Button variant="primary" className='mb-3 w-100' onClick={handleTransferShow}><i className="fas fa-money-bill-transfer"></i> Transfer</Button>
              <Button variant="tertiary" className="w-100" onClick={handleAccountSettingsShow}><i className="fas fa-sliders"></i>Account Settings</Button>
            </div>

            <div className='column-title mt-20'>
              <span className='spesific'>Total</span> <span className='transactions'>Transactions</span>
            </div>
            <div className='dashboard-transactions-chart'>
              <DonutChart />
            </div>
          </Col>

        </Row>

        {/* Account Settings Modal */}
        <Modal size="lg" show={accountSettingsShow} onHide={handleAccountSettingsClose} animation={false} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton>
            <Modal.Title>Account <span>Settings</span></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container fluid>
              <Row>
                <Col xs={6} className='pl-0'>
                  <label htmlFor='usename' className='input-label'>Username</label>
                  <input type='text' className='form-control' id='accountSettingsUsername' placeholder='Han Solo' />
                </Col>
              </Row>
              
              <Row className='mt-20'>
                <Col xs={6} className='pl-0'>
                  <label htmlFor='email' className='input-label'>Email address</label>
                  <input type='email' className='form-control' id='accountSettingsEmail' placeholder='test@test.com' />
                </Col>

                <Col xs={6} className='pr-0'>
                  <label htmlFor='password' className='input-label'>Password</label>
                  <input type='password' className='form-control' id='accountSettingsPassword' placeholder='Password' />
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleAccountSettingsClose}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleAccountSettingsClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleAccountSettingsClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>

        {/* Withdraw Modal */}
        <Modal size="lg" show={withdrawShow} onHide={handleWithdrawClose} animation={false} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton>
            <Modal.Title>Account <span>Withdraw</span></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container fluid>
              <Row>
                <Col xs={12} className='pl-0 pr-0'>
                  <label htmlFor='withdrawAmount' className='input-label'>Withdraw Amount</label>
                  <input type='number' className='form-control' id='withdrawAmount' placeholder='Enter amount' />
                  <br></br>
                  <Button variant="primary" onClick={() => {
                    const withdrawInput = document.getElementById('withdrawAmount') as HTMLInputElement;
                    const amount = withdrawInput ? withdrawInput.value : null;
                    setWithdrawAmount(amount ? parseInt(amount) : 0);
                    handleWithdraw();
                  }}>
                    Withdraw
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleWithdrawClose}>
              Cancel
            </Button>
            {/* <Button variant="primary" onClick={handleWithdrawClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>

        {/* Transfer Modal */}
        <Modal size="lg" show={transferShow} onHide={handleTransferClose} animation={false} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton>
            <Modal.Title>Account <span>Transfer</span></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container fluid>
              <Row>
                <Col xs={12} className='pl-0 pr-0'>
                  Transfer
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleTransferClose}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleTransferClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleWithdrawClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
}

export default Dashboard;