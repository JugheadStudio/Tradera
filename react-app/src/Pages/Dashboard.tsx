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

import { ReactComponent as EonsRed } from '../assets/eons-red.svg';
import { ReactComponent as EonsGreen } from '../assets/eons-green.svg';
import { ReactComponent as EonsBlack } from '../assets/eons-black.svg';
import { ReactComponent as RandBlack } from '../assets/rand-black.svg';
import DonutChart from '../Components/DonutChart';

function Dashboard() {

  // currently logged in users id
  const [loggedUserId, setLoggedUserId] = useState(0);

  const [userInfo, setUserInfo] = useState(null);
  const [amountInWallet, setAmountInWallet] = useState(0);
  const [activeOrNo, setActiveOrNo] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState();
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentTier, setCurrentTier] = useState(1);
  const [currentTierText, setCurrentTierText] = useState("");

  const [upgradeEligible, setUpgradeEligible] = useState(false);

  const [transactionFee, setTransactionFee] = useState(0);

  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const [toAccount, setToAccount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const upgradeRequirements: Record<number, { eons: number; transactions: number }> = {
    1: { eons: 5000, transactions: 10 }, // Traveller to Explorer
    2: { eons: 20000, transactions: 50 }, // Explorer to Voyager
    3: { eons: 50000, transactions: 100 }, // Voyager to Precursor
  };

  // Fetch user ID from session storage when component mounts
  useEffect(() => {
    const userIdFromSession = sessionStorage.getItem("user_id");
    setLoggedUserId(userIdFromSession ? parseInt(userIdFromSession) : 0);
  }, []); 

  // Fetches account details whenever loggedUserId changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (loggedUserId > 0) {
        try {
          const response = await axios.get('http://localhost:5219/api/Account/ByUserId/' + loggedUserId);
          const userData = response.data;

          console.log(userData);

          setUserInfo(userData);
          setAmountInWallet(userData.balance);
          setActiveOrNo(userData.active);
          console.log("Account data fetched successfully");

          sessionStorage.setItem("account_id", userData.account_id);

        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [loggedUserId]); // This runs whenever loggedUserId changes

  // Withdraw functionality
  const handleWithdraw = async () => {
    try {
      const response = await axios.post(`http://localhost:5219/api/Transaction/Deposit?accountId=${sessionStorage.getItem("account_id")}&amount=${depositAmount}`);
      console.log('Deposit successful:', response.data);

      // Set success message and show modal
      setSuccessMessage("Deposit has been successfully completed!");
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error processing deposit:', error);
    }
  };

  // Withdrawals
  const handleWithdrawSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5219/api/Transaction/Withdraw?accountId=${sessionStorage.getItem("account_id")}&amount=${withdrawAmount}`);
      console.log('Withdrawal successful:', response.data);

      // Set success message and show modal
      setSuccessMessage("Withdrawal has been successfully completed!");
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error processing withdrawal:', error);
    }
  };

  // Transfers
  const handleTransferSubmit = async () => {
    try {
      let taxedTransferAmount = transferAmount - transactionFee;

      if (transferAmount < transactionFee) {
        console.error('Transfer amount is less than the transaction fee. Transfer not processed.');
        return;
      }

      const response = await axios.post(`http://localhost:5219/api/Transaction/Transfer?fromAccountId=${sessionStorage.getItem("account_id")}&toAccountId=${toAccount}&amount=${taxedTransferAmount}`);
      console.log('Transfer successful:', response.data);

      // Set success message and show modal
      setSuccessMessage("Transfer has successfully been completed!");
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error processing transfer:', error);
    }
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Optionally reload the data or page if needed
    window.location.reload();
  };

  // when you upgrade to a new account tier
  const handleUpgrade = async () => {
    try {
      const response = await axios.put(`http://localhost:5219/api/Account/Upgrade/${sessionStorage.getItem("account_id")}`);
      console.log('Upgrade successful:', response.data);

      window.location.reload();
    } catch (error) {
      console.error('Error upgrading account:', error);
    }
  };

  const donutData = {
    datasets: [{
      data: [totalTransactions, upgradeRequirements[currentTier].transactions - totalTransactions],
      backgroundColor: ['#9CCDDC', '#1A191E'],
      borderWidth: 0,
      borderRadius: 20,
    }],
  };

  // Frontend modal control
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
        {/* Success Modal */}
        <Modal show={showSuccessModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Operation Completed</Modal.Title>
          </Modal.Header>
          <Modal.Body>{successMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col className='border-container'>
            <p className='account-status'>
              Account Status:
              <span className={activeOrNo ? 'active' : 'frozen'}>
                {activeOrNo ? ' Active' : ' Frozen'}
              </span>
            </p>
          </Col>
        </Row>

        <Row className='mt-20'>

          <Col xs={4}>
            <div className='column-title'>
              <span className='spesific'>My</span> <span className='transactions'>Balance</span>
            </div>
            <div className='dashboard-balance-card'>
              <div className='cardcontainder'>
                <div className='d-flex align-item-center'>
                  <EonsBlack/>
                  <div className='cardbalance'>
                    {amountInWallet}
                  </div>
                </div>

                <div className='d-flex align-item-center mt-20'>
                  <RandBlack/>
                  <div className='cardbalance'>
                    {amountInWallet}
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions begin here */}

            <div className='column-title mt-20'>
              <span className='spesific'>Pending</span> <span className='transactions'>Transactions</span>
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

          </Col>

          <Col xs={5}>

            <div className='column-title'>
              <span className='spesific'>Recent</span> <span className='transactions'>Transactions</span>
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
              <Button variant="secondary w-100" onClick={handleWithdrawShow} className='mb-3'><i className="fas fa-wallet"></i> Withdraw</Button>
              <Button variant="primary w-100" className='mb-3'><i className="fas fa-money-bill"></i> Deposit</Button>
              <Button variant="primary" className='mb-3 w-100' onClick={handleTransferShow}><i className="fas fa-money-bill-transfer"></i> Transfer</Button>
              <Button variant="tertiary" className="w-100" onClick={handleAccountSettingsShow}><i className="fas fa-sliders"></i>Account Settings</Button>
            </div>

            <div className='column-title mt-20'>
              <span className='spesific'>Total</span> <span className='transactions'>Transactions</span>
            </div>
            <div className='dashboard-transactions-chart'>
              <DonutChart/>

              <p className='mt-20 mb-0'>Next Tier 20/50</p>
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
          </Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
}

export default Dashboard;