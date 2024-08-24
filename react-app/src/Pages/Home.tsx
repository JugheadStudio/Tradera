import React, { useState } from "react";

import { Button, Col, Container, Modal, Row } from "react-bootstrap";

import { ReactComponent as EonsLogo } from "../assets/eons-home.svg";
import { ReactComponent as EonsGreen } from "../assets/eons-green.svg";
import { ReactComponent as EonsRed } from "../assets/eons-red.svg";
import { ReactComponent as EonsGrey } from "../assets/eons-grey.svg";
import { ReactComponent as RandGrey } from "../assets/rand-icon.svg";
import PriceChart from "../Components/PriceChart";

function Home() {
  const [buyShow, setBuyShow] = useState(false);
  const [sellShow, setSellShow] = useState(false);
  const [withdrawShow, setWithdrawShow] = useState(false);
  const [paymentShow, setPaymentShow] = useState(false);

  const handleBuyClose = () => setBuyShow(false);
  const handleBuyShow = () => setBuyShow(true);

  const handleSellClose = () => setSellShow(false);
  const handleSellShow = () => setSellShow(true);

  const handleWithdrawClose = () => setWithdrawShow(false);
  const handleWithdrawShow = () => setWithdrawShow(true);

  const handlePaymentClose = () => setPaymentShow(false);
  const handlePaymentShow = () => setPaymentShow(true);

  return (
    <div className="page-background">
      <Container fluid>
        <Row className="align-item-center">
          <Col xs={6}>
            <div className="price-chart-container">
              <PriceChart />
            </div>
          </Col>

          <Col xs={3} className="">
            <div className="d-flex home-eons-logo-container">
              <div>
                <EonsLogo />
              </div>
              <div>
                <p className="home-eons-heading">EONS / ZAR</p>
                <p className="home-eons-price">R 112.00</p>
              </div>
            </div>
            <div>
              <div className="border-container-price">
                <p className="price-open-close">
                  <span>
                    <strong className="price-high">High:</strong> R 150.00
                  </span>
                  <span>
                    <strong className="price-low">low:</strong> R 90.00
                  </span>
                </p>
              </div>
            </div>
            <div className="home-buttons">
              <Button variant="secondary" onClick={handleBuyShow}>Buy</Button>
              <Button variant="danger" onClick={handleSellShow}>Sell</Button>
            </div>
          </Col>

          <Col xs={3}>
            <div className='column-title'>
              <span className='spesific'>My</span> <span className='transactions'>Account</span>
            </div>
            <div className="border-container my-account-container">
              <p>
                <span className="icon-wrapper"><EonsGrey/></span>
                25,000
              </p>

              <p className="mb-20">
                <span className="icon-wrapper"><RandGrey/></span>
                105,000
              </p>

              <Button variant="primary w-100" onClick={handleWithdrawShow}><i className="fas fa-wallet"></i> Withdraw</Button>
              <Button variant="primary w-100" className='mt-3' onClick={handlePaymentShow}><i className="fas fa-money-bill"></i> Make Payment</Button>

            </div>
          </Col>
        </Row>

        <Row className="mt-20">
          <Col xs={6}>
            <div className='column-title'>
              <span className='spesific'>Trade</span> <span className='transactions'>History</span>
            </div>

            <div className='home-transactions-row-headings'>
              <div>
                <p>Action</p>
              </div>

              <div>
                <p>Price</p>
              </div>

              <div>
                <p>Total</p>
              </div>

              <div>
                <p>Eons</p>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Sell</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-red'>
                <p>55</p>
                <EonsRed/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Buy</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-green'>
                <p>55</p>
                <EonsGreen/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Sell</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-red'>
                <p>55</p>
                <EonsRed/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Buy</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-green'>
                <p>55</p>
                <EonsGreen/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Sell</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-red'>
                <p>55</p>
                <EonsRed/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Buy</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-green'>
                <p>55</p>
                <EonsGreen/>
              </div>
            </div>

          </Col>

          <Col xs={6}>
            <div className='column-title'>
              <span className='spesific'>My</span> <span className='transactions'>History</span>
            </div>

            <div className='home-transactions-row-headings'>
              <div>
                <p>Action</p>
              </div>

              <div>
                <p>Price</p>
              </div>

              <div>
                <p>Total</p>
              </div>

              <div>
                <p>Eons</p>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Sell</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-red'>
                <p>55</p>
                <EonsRed/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Buy</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-green'>
                <p>55</p>
                <EonsGreen/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Sell</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-red'>
                <p>55</p>
                <EonsRed/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Buy</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-green'>
                <p>55</p>
                <EonsGreen/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Sell</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-red'>
                <p>55</p>
                <EonsRed/>
              </div>
            </div>

            <div className='home-transactions-row'>
              <div>
                <p><strong>Buy</strong></p>
              </div>

              <div>
                <p className="text-grey">R 112</p>
              </div>

              <div>
                <p className="text-grey">R 15,500</p>
              </div>

              <div className='home-transactions-count-green'>
                <p>55</p>
                <EonsGreen/>
              </div>
            </div>

          </Col>
        </Row>

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
                      25,000
                    </p>

                    <p>
                      <span className="icon-wrapper"><RandGrey/></span>
                      105,000
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-20">
                <Col xs={6} className="pl-0">
                  <label htmlFor='buyAmount' className='input-label'>Amount To Buy</label>
                  <input type='text' className='form-control' id='buyAmount' placeholder='0' />
                </Col>

                <Col xs={6} className="pr-0">
                  <label htmlFor='currentPrice' className='input-label'>Current Buy Price</label>
                  <input type='text' className='form-control' id='buyCurrentPrice' placeholder='100' readOnly />
                </Col>
              </Row>

              <Row className="mt-20">
                <Col xs={12} className="pl-0 text-end">
                  <h3><strong>Total:</strong> R5000</h3>
                </Col>
              </Row>
              
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">
              Buy
            </Button>
            <Button variant="danger" onClick={handleBuyClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

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
                      25,000
                    </p>

                    <p>
                      <span className="icon-wrapper"><RandGrey/></span>
                      105,000
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-20">
                <Col xs={6} className="pl-0">
                  <label htmlFor='buyAmount' className='input-label'>Amount To Sell</label>
                  <input type='text' className='form-control' id='buyAmount' placeholder='0' />
                </Col>

                <Col xs={6} className="pr-0">
                  <label htmlFor='currentPrice' className='input-label'>Current Sell Price</label>
                  <input type='text' className='form-control' id='buyCurrentPrice' placeholder='100' readOnly />
                </Col>
              </Row>

              <Row className="mt-20">
                <Col xs={12} className="pl-0 text-end">
                  <h3><strong>Total:</strong> R5000</h3>
                </Col>
              </Row>

            </Container>
          </Modal.Body>

          <Modal.Footer className="mt-20">
            <Button variant="secondary">
              Sell
            </Button>
            <Button variant="danger" onClick={handleSellClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Make Payment Modal */}
        <Modal size="lg" show={paymentShow} onHide={handlePaymentClose} animation={false} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton>
            <Modal.Title>Make <span>Payment</span></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container fluid>
              <Row>
                <Col xs={12} className='pl-0 pr-0'>
                  Make Payment
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handlePaymentClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Withdraw Modal */}
        <Modal size="lg" show={withdrawShow} onHide={handleWithdrawClose} animation={false} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton>
            <Modal.Title>Withdraw <span>Money</span></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container fluid>
              <Row>
                <Col xs={12} className='pl-0 pr-0'>
                  Withdraw
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleWithdrawClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
}

export default Home;
