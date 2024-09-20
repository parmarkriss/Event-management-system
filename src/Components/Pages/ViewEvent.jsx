import React, { useContext, useState } from 'react';
import { EventContext } from '../EventContext';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const ViewEvent = () => {
  const { events, deleteEvent } = useContext(EventContext);
  const { user } = useContext(UserContext);

  const [searchType, setSearchType] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');

  const userEvents = events.filter(event => event.userId === user?.id);

  const filteredEvents = userEvents.filter(event => {
    return (
      (searchType === '' || event.title.toLowerCase().includes(searchType.toLowerCase())) &&
      (searchDate === '' || event.date === searchDate) &&
      (searchLocation === '' || event.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
      (eventTypeFilter === '' || event.eventType === eventTypeFilter)
    );
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const handleReset = () => {
    setSearchType('');
    setSearchDate('');
    setSearchLocation('');
    setEventTypeFilter('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-950 text-center">Event Details</h2>
      <div className="mb-6 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-64"
        />
        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-64"
        />
        <select
          id="eventType"
          value={eventTypeFilter}
          onChange={(e) => setEventTypeFilter(e.target.value)}
          className="p-3 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Meetup">Meetup</option>
        </select>
        <button
          onClick={handleReset}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Reset
        </button>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="flex justify-center">
              <div className="card w-full max-w-sm shadow-lg rounded-lg bg-white overflow-hidden">
                {event.image && (
                  <div className="w-full h-48 sm:h-56 lg:h-64 flex justify-center items-center">
                    <img src={event.image} alt="Event" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
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
                    <div className="flex gap-4 mt-4">
                      <Link to={`/editevent/${event.id}`}>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Edit</button>
                      </Link>
                      <button onClick={() => handleDelete(event.id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No events available</p>
      )}
    </div>
  );
};

export default ViewEvent;
