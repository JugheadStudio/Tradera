import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  userId: string | null;
  username: string | null;
  role: string | null; // Added role property
  setUserId: (id: string | null) => void; 
  setUsername: (name: string | null) => void;
  setRole: (role: string | null) => void; // Setter for the role
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
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null); // State for role

  // Function to fetch user data
  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5219/api/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username); // Assuming the API returns an object with a username field
        setRole(data.role); // Assuming the API returns an object with a role field
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
      role,           // Provide the role
      setUserId,      
      setUsername,    
      setRole,        // Provide the ability to set the role
      fetchUserData
    }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
