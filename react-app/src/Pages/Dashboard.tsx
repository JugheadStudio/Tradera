import React from 'react';
import logo from '../assets/logo2.png';
import steve from '../assets/steve.png';
import netflix from '../assets/netflix.png';
import figma from '../assets/figma.png';
import google from '../assets/google.png';
import olivia from '../assets/olivia.png';
import redlogo from '../assets/redlogo.png';
import yellowlogo from '../assets/yellowlogo.png';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import { Container, Row, Col } from 'react-bootstrap';

function Dashboard() {
  return (
    <div className='page-background'>
      <Container>
        <Row>

          <Col xs={4}>
            <div className='column-title'>
              <span className='spesific'>Your</span> <span className='transactions'>Balance</span>
            </div>
            <div className='dashboard-balance-card'>
              <div className='cardcontainder'>
                <img id='cardLogo' src={logo} alt='Tradera Logo' />
                <div className='cardbalance'>
                  10646.89
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

            <div className='column-title'>
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
                <p>-25 <img id='current' src={redlogo} alt='redlogo' /></p>
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
                <p>+25 <img id='current' src={yellowlogo} alt='yellowlogo' /></p>
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
                <p>-55 <img id='current' src={redlogo} alt='redlogo' /></p>
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
                <p>+25 <img id='current' src={yellowlogo} alt='yellowlogo' /></p>
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
                <p>-525 <img id='current' src={redlogo} alt='redlogo' /></p>
              </div>
            </div>
          </Col>

          {/* bar chart here */}
          <Col xs={8}>
            <div className='column-title'>
              <span className='spesific'>Your</span> <span className='transactions'>Status</span>
            </div>
            <div className='dasboard-status-chart'>
              <BarChart />
            </div>

            <Row>
              <Col sx={7}>
                <div className='column-title'>
                  <span className='spesific'>Pending</span> <span className='transactions'>Transactions</span>
                </div>

                <div className='bottom-left-column'>
                  <div className='transactions-row'>
                    <img className='transactionsLogo' src={figma} alt='Figma logo' />
                    <div className='transactions-info'>
                      <div className='transactions-name'>Figma</div>
                      <div className='transactions-usetype'>Monthly Transaction</div>
                    </div>
                    <div className='transactions-count-red'>
                      <p>
                        -55 <img id='current' src={redlogo} alt='redlogo' />
                      </p>
                    </div>
                  </div>

                  <div className='transactions-row'>
                    <img className='transactionsLogo' src={google} alt='Google logo' />
                    <div className='transactions-info'>
                      <div className='transactions-name'>Google</div>
                      <div className='transactions-usetype'>Monthly Transaction</div>
                    </div>
                    <div className='transactions-count-yellow'>
                      <p>
                        +25 <img id='current' src={yellowlogo} alt='redlogo' />
                      </p>
                    </div>
                  </div>

                  <div className='transactions-row'>
                    <img className='transactionsLogo' src={olivia} alt='Profile' />
                    <div className='transactions-info'>
                      <div className='transactions-name'>Olivia</div>
                      <div className='transactions-usetype'>Transaction</div>
                    </div>
                    <div className='transactions-count-red'>
                      <p>
                        -525 <img id='current' src={redlogo} alt='redlogo' />
                      </p>
                    </div>
                  </div>

                </div>
              </Col>

              <Col xs={5}>
                <div className='column-title'>
                  <span className='spesific'>Total</span> <span className='transactions'>Transactions</span>
                </div>
                <div className='dashboard-transactions-chart'>
                  <DonutChart />
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
