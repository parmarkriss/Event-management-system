import React, { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  return currentUser ? element : navigate('/');
};

export default ProtectedRoute;
