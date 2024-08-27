import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { deleteUser, getUsers } from '../Services/userService';
import logo from '../assets/logo2.png';
import { ReactComponent as EonsBlack } from '../assets/eons-black.svg';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  const dummyCards = [
    { username: 'Alice', role: 'Explorer', balance: 8532.45, expiry: '11/25', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { username: 'Frank', role: 'Traveler', balance: 3456.78, expiry: '05/25', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { username: 'Eve', role: 'Voyager', balance: 4567.89, expiry: '03/24', color: '#FFD700', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { username: 'Bob', role: 'Voyager', balance: 2145.67, expiry: '09/24', color: '#FFD700', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { username: 'Grace', role: 'Explorer', balance: 6789.01, expiry: '07/24', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { username: 'Dave', role: 'Traveler', balance: 10646.89, expiry: '10/26', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { username: 'Henry', role: 'Voyager', balance: 9012.34, expiry: '09/23', color: '#FFD700', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { username: 'Carol', role: 'Traveler', balance: 5678.90, expiry: '12/23', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { username: 'David', role: 'Explorer', balance: 7890.12, expiry: '01/25', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { username: 'Olivia', role: 'Explorer', balance: 6543.21, expiry: '06/25', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { username: 'George', role: 'Traveler', balance: 8765.43, expiry: '08/24', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { username: 'Sophie', role: 'Voyager', balance: 3210.98, expiry: '02/26', color: '#FFD700', avatar: 'https://randomuser.me/api/portraits/women/15.jpg' },
    { username: 'Lucas', role: 'Explorer', balance: 9876.54, expiry: '04/25', color: '#98FB98', avatar: 'https://randomuser.me/api/portraits/men/17.jpg' },
    { username: 'Emma', role: 'Traveler', balance: 7654.32, expiry: '11/24', color: '#87CEFA', avatar: 'https://randomuser.me/api/portraits/women/19.jpg' },
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



  const renderFreezeButton = (icon: string) => (
    <button className="admin-button">
      <i className={`fas ${icon}`}></i> 
    </button>
  );

  const renderAddUserButton = (icon: string, text: string) => (
    <button className="admin-button">
      <i className={`fas ${icon}`}></i> {text}
    </button>
  );

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.user_id !== id)); // Update the UI after deletion
  };

  const renderDeleteButton = (icon: string, userId: number) => (
    <button
      className="admin-button"
      onClick={() => handleDeleteUser(userId)} // Pass userId to the delete handler
    >
      <i className={`fas ${icon}`}></i>
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      const validRoles = ['Traveler', 'Explorer', 'Voyager', 'Precursor'];

      let filteredUsers = [];

      if (data && data.$values) {
        filteredUsers = data.$values.filter((user: any) => validRoles.includes(user.role));
      } else {
        filteredUsers = dummyCards.filter((user: any) => validRoles.includes(user.role));
      }

      // Sort users alphabetically by username
      filteredUsers.sort((a: { username: string; }, b: { username: string; }) => a.username.localeCompare(b.username));

      setUsers(filteredUsers);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Explorer':
        return '#9E67F4'; 
      case 'Traveler':
        return '#87CEFA'; 
      case 'Voyager':
        return '#98FB98'; 
      case 'Precursor':
        return '#FFD700' ; 
      default:
        return '#FFFFFF';  // Default color if role is not found
    }
  };

  // TODO: render cards in alfabetic
  const renderCard = (card: any, index: number) => (
    <Col key={index} xs={12} sm={6} md={4} className="mb-4">
      <div className="admin-card" style={{ backgroundColor: getRoleColor(card.role) }}>
        <div className="admin-card-header">
          <img src={card.avatar || logo} alt="User Avatar" className="admin-card-avatar" />
          <div className="admin-card-title">{card.username}</div>
          <div className="admin-card-subtitle">{card.role}</div>
        </div>
        <div className="admin-card-body">
          <div className='cardcontainder'>
            <EonsBlack />
            <div className='cardbalance'>
              {card.balance || 'N/A'}
            </div>
          </div>
          <div className="admin-card-expiry">Expires {card.expiry || 'N/A'}</div>
          <div className='admin-button-container-delete-freeze'>
            {renderFreezeButton('fa-user-lock')}
            {renderDeleteButton('fa-trash-alt', card.user_id)} 
          </div>
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
      <div className='frozen-count-red'>
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
            <div className="admin-left-container" style={{ maxHeight: 'calc(100vh - 150px)' }}>
              <div className="admin-button-container">
                {renderAddUserButton('fa-user-plus', 'Add User')}
                {renderSearchBar()}
              </div>
              <Container className="admin-users-container" style={{ overflowY: 'auto' }}>
                <Row>
                  {loading ? <p>Loading...</p> : users.map(renderCard)}
                </Row>
              </Container>
            </div>
          </Col>
          <Col md={4}>
            <div className='column-title'>
              <span className='spesific'>All</span> <span className='transactions'>Frozen Accounts</span>
            </div>
            <div className="search-container mb-3">
              <input
                type="text"
                className="search-input"
                placeholder="Search accounts..."
              />
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
            {frozenAccounts.map(renderFrozenAccount)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;