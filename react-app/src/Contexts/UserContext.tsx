import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  userId: string | null;
  username: string | null;
  setUserId: (id: string | null) => void; // Setter for the userId
  setUsername: (name: string | null) => void; // Setter for the username (optional if you want external control)
  fetchUserData: (userId: string) => Promise<void>; // Ensure this is async
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
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Function to fetch user data
  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5219/api/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username); // Assuming the API returns an object with a username field
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
      setUserId,       // Provide the ability to set the user ID from components
      setUsername,     // Provide the ability to set the username from components
      fetchUserData
    }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;