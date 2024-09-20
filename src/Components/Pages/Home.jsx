import React, { useContext } from 'react';
import { EventContext } from '../EventContext';

const Home = () => {
  const { events } = useContext(EventContext);

  const upcomingEvents = events.filter(event => event.status === 'upcoming');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-950 text-center">Upcoming Events</h1>
      {upcomingEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex justify-center">
              <div className="card w-full max-w-sm shadow-lg rounded-lg bg-white overflow-hidden">
                {event.image && (
                  <div className="w-full h-48 flex justify-center items-center">
                    <img src={event.image} alt="Event" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600">Date:</span>
                      <span className="ml-2 text-gray-800">{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600">Location:</span>
                      <span className="ml-2 text-gray-800">{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600">Max Attendees:</span>
                      <span className="ml-2 text-gray-800">{event.maxAttendees}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600">Event Type:</span>
                      <span className="ml-2 text-gray-800">{event.eventType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600">Status:</span>
                      <span className="ml-2 text-gray-800">{event.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No upcoming events available</p>
      )}
    </div>
  );
};

export default Home;
