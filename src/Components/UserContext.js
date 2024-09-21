import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load users and logged-in user from localStorage when the app starts
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
    setUsers(savedUsers);
    setCurrentUser(loggedInUser);  // Set the currently logged-in user
  }, []);

  // Save updated users to localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  // Store the logged-in user in localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Register a new user
  const registerUser = (newUser) => {
    const existingUser = users.find(user => user.email === newUser.email);
    if (!existingUser) {
      const userId = Date.now();
      const updatedUsers = [...users, { ...newUser, id: userId }];
      setUsers(updatedUsers);
      setCurrentUser({ ...newUser, id: userId });  // Set newly registered user as the logged-in user
    } else {
      console.log('User already exists!');
    }
  };

  // Login a user
  const loginUser = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));  // Save the logged-in user
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('loggedInUser');

  };

  return (
    <UserContext.Provider value={{ users, currentUser, registerUser, loginUser, logoutUser}}>
      {children}
    </UserContext.Provider>
  );
};
