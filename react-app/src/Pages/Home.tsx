import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Col, Container, Modal, Row } from "react-bootstrap";

import { ReactComponent as EonsLogo } from "../assets/eons-home.svg";
import { ReactComponent as EonsGreen } from "../assets/eons-green.svg";
import { ReactComponent as EonsRed } from "../assets/eons-red.svg";
import { ReactComponent as EonsGrey } from "../assets/eons-grey.svg";
import { ReactComponent as RandGrey } from "../assets/rand-icon.svg";
import PriceChart from "../Components/PriceChart";

interface Transaction {
  transaction_id: number;
  amount: number;
  randAmount: number;
  transaction_type: 'Buy' | 'Sell' | 'Deposit' | 'Withdrawal' | 'Transfer';
  timestamp: string;
  trom_account_id?: number;
  to_account_id?: number;
}

function Home() {

  const [chartData, setChartData] = useState([]);
  const [priceData, setPriceData] = useState({
    currentPrice: 0,
    highestPrice: 0,
    lowestPrice: 0
  });

  // currently logged in users id
  const [loggedAccountId, setLoggedAccountId] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [randAmountInWallet, setRandAmountInWallet] = useState(0);
  const [amountInWallet, setAmountInWallet] = useState(0);

  const [transactionFee, setTransactionFee] = useState(0);

  const [activeOrNo, setActiveOrNo] = useState(0);

  const [currentBuyAmount, setCurrentBuyAmount] = useState(0);
  
  const [currentSellAmount, setCurrentSellAmount] = useState(0);

  const [currentPrice, setCurrentPrice] = useState(0);

  const [buyShow, setBuyShow] = useState(false);
  const [sellShow, setSellShow] = useState(false);

  const [withdrawShow, setWithdrawShow] = useState(false);
  const [paymentShow, setPaymentShow] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // buy and sell open and close
  const handleBuyClose = () => setBuyShow(false);
  const handleBuyShow = () => {
    setBuyShow(true);
    setCurrentBuyAmount(0);
  }

  const handleSellClose = () => setSellShow(false);
  const handleSellShow = () => {
    setSellShow(true);
    setCurrentSellAmount(0);
  }

  const handleWithdrawClose = () => setWithdrawShow(false);
  const handleWithdrawShow = () => setWithdrawShow(true);

  const handlePaymentClose = () => setPaymentShow(false);
  const handlePaymentShow = () => setPaymentShow(true);



  // Fetch account ID from session storage when component mounts
  useEffect(() => {
    const accountIdFromSession = sessionStorage.getItem("account_id");
    setLoggedAccountId(accountIdFromSession ? parseInt(accountIdFromSession) : 0);
  }, []); 

  // Pull transactions from database 
  useEffect(() => {
    axios.get('http://localhost:5219/api/Transaction')
      .then(response => {
        const data = response.data;
        // Access the array under $values
        const transactionsArray = data.$values || [];

        // Log the entire array and its content
        console.log("data: ", transactionsArray);
        
        setTransactions(transactionsArray);
      })
      .catch(err => {
        console.error("Failed to fetch transactions", err);
        setTransactions([]);
      });
  }, []);


  // Fetches account details
  useEffect(() => {
    const fetchUserData = async () => {
      if (loggedAccountId > 0) {
        try {
          const response = await axios.get('http://localhost:5219/api/Account/' + loggedAccountId);
          const userData = response.data;

          console.log(userData);

          setUserInfo(userData);
          setAmountInWallet(userData.balance);
          setRandAmountInWallet(userData.randBalance);

          setActiveOrNo(userData.active);

          if (userData.account_status_id === 1) {
            setTransactionFee(5);
            console.log("Account status is Traveller.");

          } else if (userData.account_status_id === 2) {
            setTransactionFee(20);
            console.log("Account status is Explorer.");

          } else if (userData.account_status_id === 3) {
            setTransactionFee(17);
            console.log("Account status is Voyager.");

          } else {
            setTransactionFee(12);
            console.log("Account status is Precursor.");
          }

          console.log("Account data fetched successfully");

          sessionStorage.setItem("account_id", userData.account_id);

        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [loggedAccountId]); // This runs whenever loggedUserId changes

  const fetchChartData = async () => {
    try {
        const response = await axios.get('http://localhost:5219/api/price/hourly-prices');
        setChartData(response.data);
    } catch (error) {
        console.error('Error fetching chart data:', error);
    }
};


  const handleBuy =() => {
    const handleBuyRequest = async () => {
      try {
        let TotalBuyPrice = 0;

        TotalBuyPrice = Math.round(currentBuyAmount * priceData.currentPrice);
        console.log(TotalBuyPrice);
        
        const response = await axios.post(`http://localhost:5219/api/Transaction/Buy?accountId=${sessionStorage.getItem("account_id")}&randAmount=${TotalBuyPrice}&eonAmount=${currentBuyAmount}`);
        console.log('Buy request successful:', response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error buying:', error);
      }
    };

    handleBuyRequest();
  };

  const handleSell =() => {
    const handleSellRequest = async () => {
      try {
        let TotalSellPrice = 0;

        TotalSellPrice = Math.round(currentSellAmount * priceData.currentPrice);
        console.log(TotalSellPrice);

        const response = await axios.post(`http://localhost:5219/api/Transaction/Sell?accountId=${sessionStorage.getItem("account_id")}&randAmount=${TotalSellPrice}&eonAmount=${currentSellAmount}`);
        console.log('Sell request successful:', response.data);
        
        window.location.reload();
      } catch (error) {
        console.error('Error buying:', error);
      }
    };

    handleSellRequest();
  };

  useEffect(() => {
    fetchChartData(); // Initial fetch
    const interval = setInterval(fetchChartData, 5000); // 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const setCurrentPriceDetails = (currentPriceDetails: PriceData) => {
    setPriceData(currentPriceDetails);
  }

  // gets the chart data
  useEffect(() => {
    fetchChartData(); // Initial fetch
    const interval = setInterval(fetchChartData, 5000); // 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  interface PriceData {
    currentPrice: number;
    highestPrice: number;
    lowestPrice: number;
  }
  
  return (
    <div className="page-background">

      <Container fluid>
        <Row className="">
          <Col xs={7}>
            <div className="price-chart-container">
              <PriceChart currentPriceDetails={setCurrentPriceDetails}/>
            </div>

            <div className='column-title mt-20'>
              <span className='spesific'>Transaction</span> <span className='transactions'>History</span>
            </div>

            <div className='home-transactions-row-headings'>
              <div>
                <p>Action</p>
              </div>

              <div>
                <p>Price</p>
              </div>

              <div>
                <p>Eons</p>
              </div>
            </div>

            <div className='home-transactions'>
              {transactions
                .filter(transaction => transaction.transaction_type === 'Buy' || transaction.transaction_type === 'Sell')
                .reverse()
                .slice(0, 6)
                .map((transaction, index) => (
                  <div key={index} className='home-transactions-row'>
                    <div>
                      <p><strong>{transaction.transaction_type}</strong></p>
                    </div>

                    <div>
                      <p className="text-grey">R {transaction.randAmount.toFixed(2)}</p>
                    </div>

                    <div className={transaction.transaction_type === 'Buy' ? 'home-transactions-count-green' : 'home-transactions-count-red'}>
                      <p>{transaction.amount}</p>
                      {transaction.transaction_type === 'Buy' ? <EonsGreen /> : <EonsRed />}
                    </div>
                  </div>
                ))}
            </div>


          </Col>

          <Col xs={5}>

            <div>
              <div className="d-flex home-eons-logo-container">
                <div>
                  <EonsLogo />
                </div>
                <div>
                  <p className="home-eons-heading">EONS / ZAR</p>
                  <p className="home-eons-price">R {priceData.currentPrice.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <div className="border-container-price">
                  <p className="price-open-close">
                    <span>
                      <strong className="price-high">High:</strong> R {priceData.highestPrice.toFixed(2)}
                    </span>
                    <span>
                      <strong className="price-low">low:</strong> R {priceData.lowestPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="home-buttons">
                <Button variant="secondary" onClick={handleBuyShow} disabled={!activeOrNo}>Buy</Button>
                <Button variant="danger" onClick={handleSellShow} disabled={!activeOrNo}>Sell</Button>
              </div>
            </div>

            {/* YOUR ACCOUNT DETAILS GO HERE */}
            <div className='column-title mt-20'>
              <span className='spesific'>My</span> <span className='transactions'>Balances</span>
            </div>
            <div className="border-container my-account-container">

              <div className="price-open-close">
                  <p>
                    <span className="icon-wrapper"><EonsGrey/></span>
                    {amountInWallet}
                  </p>
                  <p>
                    <span className="icon-wrapper"><RandGrey/></span>
                    {randAmountInWallet}
                  </p>
              </div>
            </div>

          </Col>
        </Row>

        {/* ||||||||||||||||||||||||| */}
        {/* Buy Modal */}
        <Modal size="lg" show={buyShow} onHide={handleBuyClose} animation={false} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton>
            <Modal.Title>
              Buy <span>Eons</span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container fluid>

              <Row className="border-container">
                <Col xs={12} className="modal-account-container">
                  <div className=" d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Amount owned</h5>
                    <p>
                      <span className="icon-wrapper"><EonsGrey/></span>
                      {amountInWallet}
                    </p>

                    <p>
                      <span className="icon-wrapper"><RandGrey/></span>
                      {randAmountInWallet}
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-20">
                <Col xs={6} className="pl-0">
                  <label htmlFor='buyAmount' className='input-label'>Amount To Buy</label>
                  <input 
                    type='number' 
                    className='form-control' 
                    id='buyAmount' 
                    placeholder='0' 
                    onChange={(e) => { setCurrentBuyAmount(parseInt(e.target.value)) }} />
                </Col>
                <Col xs={6} className="pr-0">
                  <label htmlFor='currentPrice' className='input-label'>Current Buy Price</label>
                  <input type='text' className='form-control' id='buyCurrentPrice' value={priceData.currentPrice} readOnly />
                </Col>
              </Row>

              <Row className="mt-20">
                <Col xs={12} className="pl-0 text-end">
                  <h3><strong>Total:</strong> R{currentBuyAmount * priceData.currentPrice}</h3>
                </Col>
              </Row>
              
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleBuy}>
              Buy
            </Button>
            <Button variant="danger" onClick={handleBuyClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ||||||||||||||||||||||||||||||||| */}

        {/* |||||||||||||||||||||||||||||||||| */}
        {/* Sell Modal */}
        <Modal size="lg" show={sellShow} onHide={handleSellClose} animation={false} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton>
            <Modal.Title>
              Sell <span>Eons</span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container fluid>

              <Row className="border-container">
                <Col xs={12} className="modal-account-container">
                  <div className=" d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Amount owned</h5>
                    <p>
                      <span className="icon-wrapper"><EonsGrey/></span>
                      {amountInWallet}
                    </p>

                    <p>
                      <span className="icon-wrapper"><RandGrey/></span>
                      {randAmountInWallet}
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-20">
                <Col xs={6} className="pl-0">
                  <label htmlFor='buyAmount' className='input-label'>Amount To Sell</label>
                  <input 
                    type='number' 
                    className='form-control' 
                    id='SellAmount' 
                    placeholder='0' 
                    onChange={(e) => { setCurrentSellAmount(parseInt(e.target.value)) }} />
                </Col>

                <Col xs={6} className="pr-0">
                  <label htmlFor='currentPrice' className='input-label'>Current Sell Price</label>
                  <input type='text' className='form-control' id='buyCurrentPrice' value={priceData.currentPrice} readOnly />
                </Col>
              </Row>

              <Row className="mt-20">
                <Col xs={12} className="pl-0 text-end">
                  <h3><strong>Total:</strong> R{currentSellAmount * priceData.currentPrice}</h3>
                </Col>
              </Row>

            </Container>
          </Modal.Body>

          <Modal.Footer className="mt-20">
            <Button variant="secondary" onClick={handleSell}>
              Sell
            </Button>
            <Button variant="danger" onClick={handleSellClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ||||||||||||||||||||||||||| */}

      </Container>
    </div>
  );
}

export default Home;