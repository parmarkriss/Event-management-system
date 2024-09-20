import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).id : null;
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents.filter(event => event.userId === userId));
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (eventData) => {
    const now = new Date();
    const eventDate = new Date(eventData.date);

    let status = 'upcoming';
    if (eventDate < now) {
      status = 'completed';
    } else if (eventDate <= new Date(now.getTime() + 60 * 60 * 1000)) {
      status = 'ongoing';
    }

    const eventWithId = { ...eventData, id: uuidv4(), userId, status };
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(prevEvents => prevEvents.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};
