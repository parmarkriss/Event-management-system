import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { UserProvider, UserContext } from './Components/UserContext'; // Import UserContext
import Home from './Components/Pages/Home';
import Layout from './Components/HeaderandFooter/Layout';
import CreateEvent from './Components/Pages/CreateEvent';
import { EventProvider } from './Components/EventContext';
import ViewEvent from './Components/Pages/ViewEvent';
import EditEvent from './Components/Pages/EditEvent';
import { useContext } from 'react';

function App() {
  return (
    <UserProvider>
      <EventProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route element={<Layout />}>
              <Route
                path='/home'
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/create-event'
                element={
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/view-event'
                element={
                  <ProtectedRoute>
                    <ViewEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/editevent/:id'
                element={
                  <ProtectedRoute>
                    <EditEvent />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </EventProvider>
    </UserProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
};

export default App;
