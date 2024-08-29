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
  const handleToggleFreeze = async (userId: number, isFrozen: boolean) => {
    try {
      const apiEndpoint = isFrozen ? 'Unfreeze' : 'Freeze';
      await axios.post(`http://localhost:5219/api/Account/${apiEndpoint}/${userId}`);
  
      // Update the state to reflect the freeze/unfreeze action
      if (isFrozen) {
        // Unfreezing the user: move the user from frozenUsers to users
        const userToUnfreeze = frozenUsers.find(user => user.user_id === userId);
        if (userToUnfreeze) {
          setFrozenUsers(frozenUsers.filter(user => user.user_id !== userId));
          setUsers([...users, { ...userToUnfreeze, isFrozen: false }].sort((a, b) => a.username.localeCompare(b.username)));
        }
      } else {
        // Freezing the user: move the user from users to frozenUsers
        const userToFreeze = users.find(user => user.user_id === userId);
        if (userToFreeze) {
          setUsers(users.filter(user => user.user_id !== userId));
          setFrozenUsers([...frozenUsers, { ...userToFreeze, isFrozen: true }].sort((a, b) => a.username.localeCompare(b.username)));
        }
      }
    } catch (error) {
      console.error('Error toggling freeze status:', error);
    }
  };


  // Delete user
  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.user_id !== id)); // Update the UI after deletion
  };


  // Fetch all users and display them
  useEffect(() => {

    const fetchData = async () => {

      const data = await getUsers(); // Assuming this fetches all necessary data, including Account_status_id and Status_name.
      
      console.log(data);

      let activeUsers = [];
      let frozenUsers = [];
  
      if (data && data.$values) {

        // Filter users with the role 'user' and divide them into active and frozen users
        activeUsers = data.$values
          .filter((user: any) => user.role === 'User' && user.active);

        frozenUsers = data.$values
          .filter((user: any) => user.role === 'User' && !user.active);
      }
  
      // Sort users alphabetically by username
      activeUsers.sort((a: { username: string }, b: { username: string }) => a.username.localeCompare(b.username));
      frozenUsers.sort((a: { username: string }, b: { username: string }) => a.username.localeCompare(b.username));
  
      setUsers(activeUsers);
      setFrozenUsers(frozenUsers);
      setLoading(false);
    };
  
    fetchData();
  }, []);

  // Front end rendering stuff
  const renderFreezeButton = (userId: number, isFrozen: boolean) => (
    <button
      className="admin-button-freeze"
      onClick={() => handleToggleFreeze(userId, isFrozen)}
    >
      {isFrozen ? <Unfreeze /> : <Freeze />}
    </button>
  );

  const renderAddUserButton = (icon: string, text: string) => (
    <button className="admin-button">
      <i className={`fas ${icon}`}></i> {text}
    </button>
  );

  const renderDeleteButton = (userId: number) => (
    <button
      className="admin-button-delete"
      onClick={() => handleDeleteUser(userId)} // Pass userId to the delete handler
    >
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
          <div className='card-container'>
            <div>
              <EonsBlack />
              <div className='cardbalance'>
                {card.balance || 'N/A'}
              </div>
            </div>
          </div>
          <div className='admin-button-container-delete-freeze mt-20'>
            {renderFreezeButton(card.user_id, card.isFrozen)}
            {renderDeleteButton(card.user_id)}
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
        {renderFreezeButton(account.user_id, account.isFrozen)}
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
          <Col md={9}>
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
          <Col md={3}>
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