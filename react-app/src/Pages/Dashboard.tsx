import React from 'react';
import logo from '../assets/logo2.png';
import steve from '../assets/steve.png';
import netflix from '../assets/netflix.png';
import figma from '../assets/figma.png';
import google from '../assets/google.png';
import olivia from '../assets/olivia.png';
import redlogo from '../assets/redlogo.png';
import yellowlogo from '../assets/yellowlogo.png';
import BarChart from '../Components/BarChart';
import DonutChart from '../Components/DonutChart';

function Dashboard() {
  return (
    <div className='page-background'>
      <div className='container'>
        <div className='row'>

          <div className='left-column'>
            <div className='column-title'>
              <span className='spesific'>Your</span> <span className='transactions'>Balance</span>
            </div>
            <div className='left-top-row'>
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

            <div className='transactions-row2'>
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
          </div>

          {/* bar chart here */}
          <div className='right-column'>
            <div className='column-title'>
              <span className='spesific'>Your</span> <span className='transactions'>Status</span>
            </div>
            <div className='top-row'>
              <BarChart />
            </div>

            <div className='bottom-row'>
              <div className='column-wrapper'>
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

                  <div className='transactions-row2'>
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
              </div>

              <div className='bottom-right-wrapper'>
                <div className='column-title'>
                  <span className='spesific'>Total</span> <span className='transactions'>Transactions</span>
                </div>
                <div className='bottom-right-column'>
                  <DonutChart />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
