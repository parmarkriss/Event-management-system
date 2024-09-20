import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const generateUserId = () => {
    return `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  const saveUser = (userData) => {
    const userWithId = { ...userData, id: generateUserId() };
    localStorage.setItem('user', JSON.stringify(userWithId));
    setUser(userWithId);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};
