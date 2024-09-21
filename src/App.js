import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { UserProvider } from './Components/UserContext'; 
import Layout from './Components/HeaderandFooter/Layout';
import Home from './Components/Pages/Home';
import CreateEvent from './Components/Pages/CreateEvent';
import { EventProvider } from './Components/Pages/EventContext';
import ViewEvent from './Components/Pages/ViewEvent';
import EditEvent from './Components/Pages/EditEvent';
import ProtectedRoute from './Components/ProtectedRoute'; // Import your ProtectedRoute component

function App() {
    return (
        <UserProvider>
            <EventProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route element={<Layout />}>
                            <Route path='/home' element={<ProtectedRoute element={<Home />} />} />
                            <Route path='/create-event' element={<ProtectedRoute element={<CreateEvent />} />} />
                            <Route path='/view-event' element={<ProtectedRoute element={<ViewEvent />} />} />
                            <Route path='/edit-event/:id' element={<ProtectedRoute element={<EditEvent />} />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </EventProvider>
        </UserProvider>
    );
}

export default App;
