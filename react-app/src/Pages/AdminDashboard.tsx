import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo2.png';

const AdminDashboard: React.FC = () => {
  const dummyCards = [
    { name: 'Alice', role: 'Explorer', balance: 8532.45, expiry: '11/25', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Frank', role: 'Traveler', balance: 3456.78, expiry: '05/25', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { name: 'Eve', role: 'Voyager', balance: 4567.89, expiry: '03/24', color: '#FFD700', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { name: 'Bob', role: 'Voyager', balance: 2145.67, expiry: '09/24', color: '#FFD700', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Grace', role: 'Explorer', balance: 6789.01, expiry: '07/24', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { name: 'Dave', role: 'Traveler', balance: 10646.89, expiry: '10/26', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Henry', role: 'Voyager', balance: 9012.34, expiry: '09/23', color: '#FFD700', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { name: 'Carol', role: 'Traveler', balance: 5678.90, expiry: '12/23', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { name: 'David', role: 'Explorer', balance: 7890.12, expiry: '01/25', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { name: 'Olivia', role: 'Explorer', balance: 6543.21, expiry: '06/25', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { name: 'George', role: 'Traveler', balance: 8765.43, expiry: '08/24', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { name: 'Sophie', role: 'Voyager', balance: 3210.98, expiry: '02/26', color: '#FFD700', avatar: 'https://randomuser.me/api/portraits/women/15.jpg' },
    { name: 'Lucas', role: 'Explorer', balance: 9876.54, expiry: '04/25', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/men/17.jpg' },
    { name: 'Emma', role: 'Traveler', balance: 7654.32, expiry: '11/24', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/women/19.jpg' },
  ];

  const frozenAccounts = [
    { name: 'John Doe', role: 'Explorer', freezeDate: '2023-05-15', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { name: 'Jane Smith', role: 'Traveler', freezeDate: '2023-05-14', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { name: 'Mike Johnson', role: 'Voyager', freezeDate: '2023-05-13', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { name: 'Emily Brown', role: 'Explorer', freezeDate: '2023-05-12', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { name: 'Chris Wilson', role: 'Traveler', freezeDate: '2023-05-11', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
    { name: 'Sarah Davis', role: 'Voyager', freezeDate: '2023-05-10', avatar: 'https://randomuser.me/api/portraits/women/16.jpg' },
    { name: 'Tom Anderson', role: 'Explorer', freezeDate: '2023-05-09', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
    { name: 'Lisa Taylor', role: 'Traveler', freezeDate: '2023-05-08', avatar: 'https://randomuser.me/api/portraits/women/20.jpg' },
  ];

  const renderAdminButton = (icon: string, text: string) => (
    <button className="admin-button">
      <i className={`fas ${icon}`}></i> {text}
    </button>
  );

  const renderSearchBar = () => (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search accounts..."
      />
      <button className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );

  const renderCard = (card: any, index: number) => (
    <Col key={index} xs={12} sm={6} md={4} className="mb-4">
      <div className="admin-card" style={{backgroundColor: card.color}}>
        <div className="admin-card-header">
          <img src={card.avatar} alt="User Avatar" className="admin-card-avatar" />
          <div className="admin-card-title">{card.name}</div>
          <div className="admin-card-subtitle">{card.role}</div>
        </div>
        <div className="admin-card-body">
          <div className='cardcontainder'>
            <img id='cardLogo' src={logo} alt='Tradera Logo' />
            <div className='cardbalance'>
              {card.balance}
            </div>
          </div>
          <div className="admin-card-expiry">Expires {card.expiry}</div>
        </div>
      </div>
    </Col>
  );

  const renderFrozenAccount = (account: any, index: number) => (
    <div key={index} className='transactions-row'>
      <img className='transactionsLogo' src={account.avatar} alt={`${account.name} avatar`} />
      <div className='transactions-info'>
        <div className='transactions-name'>{account.name}</div>
        <div className='transactions-usetype'>{account.role}</div>
      </div>
      <div className='transactions-count-red'>
        <p>Frozen on {account.freezeDate}</p>
      </div>
    </div>
  );

  return (
    <div className='page-background'>
      <Container fluid>
        <Row>
          <Col md={8}>
            <div className='column-title'>
              <span className='spesific'>All</span> <span className='transactions'>Accounts</span>
            </div>
            <div className="admin-left-container" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
              <div className="admin-button-container">
                {renderAdminButton('fa-user-plus', 'Add User')}
                {renderAdminButton('fa-user-lock', 'Freeze Account')}
                {renderAdminButton('fa-trash-alt', 'Delete Account')}
                {renderSearchBar()}
              </div>
              <Row>
                {dummyCards.map(renderCard)}
              </Row>
            </div>
          </Col>
          <Col md={4}>
            <div className='column-title'>
              <span className='spesific'>All</span> <span className='transactions'>Frozen Accounts</span>
            </div>
            {renderSearchBar()}
            {frozenAccounts.map(renderFrozenAccount)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;