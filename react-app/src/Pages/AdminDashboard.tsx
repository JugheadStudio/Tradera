import React, { useEffect, useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { deleteUser, getUsers } from '../Services/userService';

import logo from '../assets/logo2.png';

import { ReactComponent as EonsBlack } from '../assets/eons-black.svg';
import { ReactComponent as Delete } from '../assets/delete.svg'
import { ReactComponent as Unfreeze } from '../assets/Unfreeze.svg'
import { ReactComponent as Freeze } from '../assets/Freeze.svg'

import axios from 'axios';


const AdminDashboard: React.FC = () => {

  // Variables
  const [users, setUsers] = useState<any[]>([]);
  const [frozenUsers, setFrozenUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  // handles freezing
  const handleToggleFreeze = async (user_Id: number, isFrozen: boolean) => {
  try {
    console.log ('from freeze button user request to:', user_Id);
    const apiEndpoint = isFrozen ? 'Unfreeze' : 'Freeze';
    const url = `http://localhost:5219/api/Account/${apiEndpoint}/${user_Id}`;

    // Log the URL to the console
    console.log('Making API request to:', url);

    await axios.post(url);

    // Update the state to reflect the freeze/unfreeze action
    if (isFrozen) {
      // Unfreezing the user
      const userToUnfreeze = frozenUsers.find(user => user.$id === user_Id);
      if (userToUnfreeze) {
        setFrozenUsers(frozenUsers.filter(user => user.user_id !== user_Id));
        setUsers([...users, { ...userToUnfreeze, active: true }].sort((a, b) => a.username.localeCompare(b.username)));
      }
    } else {
      // Freezing the user
      const userToFreeze = users.find(user => user.$id === user_Id);
      if (userToFreeze) {
        setUsers(users.filter(user => user.$id !== user_Id));
        setFrozenUsers([...frozenUsers, { ...userToFreeze, active: false }].sort((a, b) => a.username.localeCompare(b.username)));
      }
    }
  } catch (error) {
    console.error('Error toggling freeze status:', error);
  }
};


  // Delete user
  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.$id !== id)); // Update the UI after deletion
  };


  // Fetch all users and display them
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      
      let activeUsers = [];
      let frozenUsers = [];
  
      if (data && data.$values) {
        activeUsers = data.$values.filter((user: any) => user.role === 'User' && user.active);
        frozenUsers = data.$values.filter((user: any) => user.role === 'User' && !user.active);
      }
  
      activeUsers.sort((a: { username: string }, b: { username: string }) => a.username.localeCompare(b.username));
      frozenUsers.sort((a: { username: string }, b: { username: string }) => a.username.localeCompare(b.username));
  
      console.log(activeUsers[0])
      setUsers(activeUsers);
      setFrozenUsers(frozenUsers);
      setLoading(false);
    };
  
    fetchData();
  }, []);



  // Front end rendering stuff
  const renderFreezeButton = (user_Id: number, isFrozen: boolean) => (
    <button className="admin-button-freeze" onClick={() => handleToggleFreeze(user_Id, isFrozen)}>
      {isFrozen ? <Unfreeze /> : <Freeze />}
    </button>
    
  );

  const renderAddUserButton = (icon: string, text: string) => (
    <button className="admin-button">
      <i className={`fas ${icon}`}></i> {text}
    </button>
  );

  const renderDeleteButton = (userId: number) => (
    <button className="admin-button-delete" onClick={() => handleDeleteUser(userId)}>
      <Delete />
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
      <div className="admin-card" style={{ backgroundColor: getRoleColor(card.accountStatus) }}>
        <div className="admin-card-header">
          <img src={card.avatar || logo} alt="User Avatar" className="admin-card-avatar" />
          <div className="admin-card-title">{card.username}</div>         
          <div className="admin-card-subtitle">{card.accountStatus}</div>
        </div>
        <div className="admin-card-body">
          <div className='cardcontainder'>
            <EonsBlack />
            <div className='cardbalance'>{card.balance || 'N/A'}</div>
          </div>
          <div className="admin-card-expiry">Expires {card.expiry || 'N/A'}</div>
          <div className='admin-button-container-delete-freeze'>
            {renderFreezeButton(card.$id, !card.active)}
            {renderDeleteButton(card.user_Id)}
          </div>
        </div>
      </div>
    </Col>
  );

  const renderFrozenAccount = (account: any, index: number) => (
    <div key={index} className='transactions-row' style={{ backgroundColor: getRoleColor(account.accountStatus) }}>
      <EonsBlack />
      <div className='transactions-info'>
        <div className='transactions-username'>{account.username}</div>
        <div className='transactions-usertype'>{account.accountStatus}</div>
      </div>
      <div className='frozen-count-red'>
        {renderFreezeButton(account.$id, account.active === false)}
      </div>
    </div>
  );
  // tweak die om account status id te gebruik
  const getRoleColor = (accountStatus: string) => {
    switch (accountStatus) {
      case 'Traveler':
        return '#87CEFA';
      case 'Explorer':
        return '#9E67F4';
      case 'Voyager':
        return '#98FB98';
      case 'Precursor':
        return '#FFD700';
      default:
        return '#FFFFFF';  // Default color if status is not found
    }
  };

  

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
            {frozenUsers.map(renderFrozenAccount)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;