import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const EventContext = createContext();

// Provider Component
export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);
    }, []);

    const addEvent = (event) => {
        const updatedEvents = [...events, event];
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    const deleteEvent = (eventId) => {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    const updateEvent = (updatedEvent) => {
        const updatedEvents = events.map(event => 
            event.id === updatedEvent.id ? updatedEvent : event
        );
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };
    

    return (
        <EventContext.Provider value={{ events, addEvent, deleteEvent, setEvents, updateEvent }}>
            {children}
        </EventContext.Provider>
    );
};
