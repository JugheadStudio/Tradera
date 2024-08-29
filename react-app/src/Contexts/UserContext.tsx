import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  userId: string | null;
  username: string | null;
  role: string | null;
  setUserId: (id: string | null) => void;
  setUsername: (name: string | null) => void;
  setRole: (role: string | null) => void;
  fetchUserData: (userId: string) => Promise<void>;
}

const UserContext = createContext<User | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserIdState] = useState<string | null>(sessionStorage.getItem('userId'));
  const [username, setUsernameState] = useState<string | null>(sessionStorage.getItem('username'));
  const [role, setRoleState] = useState<string | null>(sessionStorage.getItem('role'));

  const setUserId = (id: string | null) => {
    setUserIdState(id);
    if (id) {
      sessionStorage.setItem('userId', id);
    } else {
      sessionStorage.removeItem('userId');
    }
  };

  const setUsername = (name: string | null) => {
    setUsernameState(name);
    if (name) {
      sessionStorage.setItem('username', name);
    } else {
      sessionStorage.removeItem('username');
    }
  };

  const setRole = (role: string | null) => {
    setRoleState(role);
    if (role) {
      sessionStorage.setItem('role', role);
    } else {
      sessionStorage.removeItem('role');
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5219/api/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username);
        setRole(data.role);
      } else {
        throw new Error(data.message || 'Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{
      userId,
      username,
      role,
      setUserId,
      setUsername,
      setRole,
      fetchUserData,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
